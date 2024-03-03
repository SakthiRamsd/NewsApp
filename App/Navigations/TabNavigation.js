import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Pages/HomeScreen';
import ProfileScreen from '../Pages/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import SavedNewsScreen from '../Pages/SavedNewsScreen';
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={22} />
        ), headerShown: false
      }} />
      <Tab.Screen name="SavedNews" component={SavedNewsScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="bookmark" size={22} color={color} />
        ), headerShown: false
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={22} />
        ), headerShown: false
      }} />
    </Tab.Navigator>
  );
}
