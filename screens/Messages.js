import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import { AuthContext } from '../contexts/AuthContext';
import firebase from 'firebase';
const Messages = ({ route }) => {
    const db = firebase.firestore();
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const { item } = route.params;
    useEffect(() => {
        const unsubscribeListener = db
            .collection('MESSAGES_THREADS')
            .doc(item._id)
            .collection('Messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data()
                    const data = {
                        _id: doc.id,
                        text: firebaseData.text,
                        createdAt: firebaseData.createdAt,
                        user: firebaseData.user
                    }
                    return data;
                })
                setMessages(messages)
            })

        return () => unsubscribeListener()

    }, []);
    const handleSend = async (messages) => {
        const currentText = messages[0].text;
        await db.collection('MESSAGES_THREADS')
            .doc(item._id)
            .collection('Messages')
            .add({
                text: currentText,
                createdAt: new Date().getTime(),
                user: {
                    _id: user.uid,
                    name: user.displayName,
                }
            });
        //son mesajı al
        await db.collection('MESSAGES_THREADS')
            .doc(item._id)
            .set({
                latestMessage: {
                    text: currentText,
                    createdAt: new Date().getTime(),
                    user: {
                        name: user.displayName,
                        uid: user.uid
                    }
                },
            },
                { merge: true }
            )
    }
    //user bilgilerini göster
    const showUserInfo = (user) => {
        Alert.alert(`${user.name}`);
    }
    return (
        <GiftedChat
            messages={messages}
            onSend={(message) => handleSend(message)}
            user={{
                _id: user.uid,
                name: user.displayName
            }}
            placeholder='Bir şeyler yaz...'
            onLongPressAvatar={(user) => showUserInfo(user)}
            showAvatarForEveryMessage
            showUserAvatar
            renderUsernameOnMessage
            locale={'tr'}
        />
    )
}

export default Messages;
