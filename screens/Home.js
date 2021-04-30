import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { AuthContext } from '../contexts/AuthContext';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "firebase";
import * as Permissions from 'expo-permissions';
import * as Notification from 'expo-notifications';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
const Home = () => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([])
    const [token, setToken] = useState('');
    const db = firebase.firestore();
    const chatsRef = db.collection('messages');
    useEffect(() => {
        registerForNotifications();
    }, []);

    const registerForNotifications = async () => {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = status;
        //Kullanıcıya izin sor
        if (status !== "granted") {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            status = finalStatus;
        }
        //izin verilmemiş ise
        if (finalStatus !== "granted") {
            return;
        }
        let token = await Notification.getExpoPushTokenAsync();
        setToken(token.data);
        //Token veritabanına kaydet
        db.collection('users').doc(user.uid).set({
            token: token.data
        }).then(() => {
            console.log("Başaryıla eklendi");
        })
            .catch(error => {
                Alert.alert(`Firestore'a eklenirken bir hata ile karşılaşıldı ${error}`);
            });
    }
    const messageSet = () => {
        setMessages([
            {
                id: 1,
                text: 'Merhaba',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Merto',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                id: 2,
                text: 'Sana da Merhaba',
                createdAt: new Date(),
                user: {
                    _id: 3,
                    name: 'Kubilay',
                    avatar: 'https://img-s1.onedio.com/id-53c192b2aa1cf6461479f600/rev-0/w-635/listing/f-jpg-webp/s-05c3e39520a71aa331d662e1f3beba9c8072e938.webp',
                },
            },
        ])
    }
    const handleSend = useCallback((messages = []) => {
        setMessages(prevMessages => GiftedChat.append(prevMessages, messages));
    }, []);
    return (
        <GiftedChat
            messages={messages}
            user={{
                _id: user.uid,
                name: user.displayName,
            }}
            onSend={handleSend} />
    )
}

export default Home;
