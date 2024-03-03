import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

export default function ProfileScreen({ navigation }) {

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.navigate('Login');
        }).catch((error) => {
            // An error happened.
            console.log(error.message);
        });
    };

    return (
        <View style={{ alignItems: 'center' }}>
            {/* <Text>{userEmail}</Text> */}

            <TouchableOpacity onPress={handleSignOut}
                style={{ backgroundColor: 'red', padding: 10, borderRadius: 30, marginTop: 350, width: 230, }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Sign-Out</Text>
            </TouchableOpacity>
        </View>
    );
}
