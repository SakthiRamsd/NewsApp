import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginScreen from './App/Pages/LoginScreen';
import { initializeApp } from 'firebase/app';
import TabNavigation from './App/Navigations/TabNavigation';
import ReadNewsScreen from './App/Pages/ReadNewsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SavedNewsScreen from './App/Pages/SavedNewsScreen';

const firebaseConfig = {
  apiKey: "AIzaSyDZYySc1KKJy-6M4gxjhlLjkijELYtUNPk",
  authDomain: "news-app-532ae.firebaseapp.com",
  projectId: "news-app-532ae",
  storageBucket: "news-app-532ae.appspot.com",
  messagingSenderId: "687720531087",
  appId: "1:687720531087:web:7ce61162c14e764ea09cfa",
  measurementId: "G-WW5YJSLZXR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
          <Stack.Screen name="Home" component={TabNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="ReadNews" component={ReadNewsScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}