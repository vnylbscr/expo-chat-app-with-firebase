import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import { Ionicons } from '@expo/vector-icons';
const App = createStackNavigator();

export default function AppStack() {
    return (
        <NavigationContainer>
            <App.Navigator initialRouteName="Home">
                <App.Screen options={{
                    headerTitle: "Chat App v1",
                    headerRight: () => (
                        <Ionicons.Button name="log-in-outline"
                            size={30}
                            color="black"
                            backgroundColor="#fff"
                            onPress={() => Alert.alert("aga")}
                        />
                    )
                }} name="App" component={Home} />
            </App.Navigator>

        </NavigationContainer>
    )
}
