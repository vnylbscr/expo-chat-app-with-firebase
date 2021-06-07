import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthContext';
import CreateChatRoom from '../screens/CreateChatRoom';
import ChatRoom from '../screens/ChatRoom';
import Messages from '../screens/Messages';
import Profile from '../screens/Profile';
import Yapimcilar from '../screens/Yapimcilar';
const HomeStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const YapimcilarStack = createStackNavigator();

const Tab = createBottomTabNavigator();

// Mert Genç b161210045 
// İ.Kubilay Kaynan b161210102
// Ağ Programlama
// Tab Stack
export default function AppStack() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Anasayfa") {
                        iconName = focused ? "home" : "home-outline"
                    } else if (route.name === "Mesajlar") {
                        iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"
                    } else if (route.name === "Profil") {
                        iconName = focused ? "person" : "person-outline"
                    } else if (route.name === "Yapimcilar") {
                        iconName = focused ? "contract" : "contract-outline"
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}
            >
                <Tab.Screen name="Anasayfa" component={HomeStackScreen} />
                <Tab.Screen name="Mesajlar" component={ChatStackScreen} />
                <Tab.Screen name='Profil' component={ProfileStackScreen} />
                <Tab.Screen name='Yapimcilar' component={YapimcilarStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

// Home Stack
const HomeStackScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext);
    return (
        <HomeStack.Navigator initialRouteName='ChatRoom'>
            <HomeStack.Screen name='Home' component={Home} options={{
                headerTitle: "Chat App v1",
                headerRight: () => (
                    <Ionicons.Button name="log-in-outline"
                        size={30}
                        color="black"
                        backgroundColor="#fff"
                        onPress={() => logout()}
                    />
                ),
            }}
            />
        </HomeStack.Navigator>
    )
}

// Chat stack
const ChatStackScreen = ({ navigation }) => {
    return (
        <ChatStack.Navigator initialRouteName='ChatRoom'>
            <ChatStack.Screen name='ChatRoom' component={ChatRoom} options={{
                headerTitle: 'Odalar',
                headerLeft: () => (
                    <Ionicons.Button
                        name="ios-add"
                        color='black'
                        size={30}
                        backgroundColor="#fff"
                        onPress={() => navigation.navigate('CreateChatRoom')}
                    />
                )
            }}
            />
            <ChatStack.Screen name='CreateChatRoom' component={CreateChatRoom} options={{
                headerTitle: 'Oda Oluştur'
            }}
            />
            <ChatStack.Screen name='Messages' component={Messages} options={({ route }) => ({
                title: route.params.item.roomName
            })}
            />
        </ChatStack.Navigator>
    )

}
// Profile Stack
const ProfileStackScreen = ({ navigation }) => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name='Profile' component={Profile} />
        </ProfileStack.Navigator>
    )
}

const YapimcilarStackScreen = () => {
    return (
        <YapimcilarStack.Navigator>
            <YapimcilarStack.Screen name='Yapimcilar' component={Yapimcilar} />
        </YapimcilarStack.Navigator>
    )
}