import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import Register from '../screens/Register';

const RootStack = createStackNavigator();

const Root = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Login">
                <RootStack.Screen options={{
                    headerShown: false,
                }} name="Login" component={Login} />
                <RootStack.Screen options={{
                    headerShown:false
                }} name="Register" component={Register} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default Root

const styles = StyleSheet.create({})
