import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import firebase from 'firebase';

// Mert Genç b161210045 
// İ.Kubilay Kaynan b161210102
// Ağ Programlama
const ChatRoom = ({ route, navigation }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [emptyArray, setEmptyArray] = useState(false);
    const db = firebase.firestore();
    useEffect(() => {
        setLoading(true);
        const abone = db.collection('MESSAGES_THREADS')
            .orderBy("latestMessage.createdAt", "desc")
            .onSnapshot(querySnapshot => {
                const rooms = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        name: '',
                        latestMessage: { text: '' },
                        ...documentSnapshot.data()
                    }
                })
                if (rooms.length === 0) {
                    setEmptyArray(true);
                }
                else {
                    setEmptyArray(false);
                    setRooms(rooms);
                }
            })
        setLoading(false);
        return () => abone()
    }, []);
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Messages', { item: item })} >
                <View style={styles.itemContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{item.roomName}</Text>
                    <Text style={{ fontSize: 15, color: 'gray' }}>{item.latestMessage.text}</Text>
                    <Text style={{ fontSize: 15, color: 'gray' }}>
                        {new Date(item.latestMessage.createdAt).toLocaleString()}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    // Hiç oda yok ise
    if (emptyArray) {
        return (
            <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => navigation.navigate('CreateChatRoom')}>
                <Text>Henüz oda yok. Buraya tıklayarak oluştur!</Text>
            </TouchableOpacity>
        )
    }
    // Yükleniyor
    const Loading = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='rgb(122,211,232)' />
            </View>
        )
    }
    // Odaları göster
    return (
        <View style={styles.container}>
            <FlatList
                data={rooms}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Loading />}
            >
            </FlatList>
        </View>
    )
}
export default ChatRoom

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        backgroundColor: '#aaeef2',
        borderWidth: StyleSheet.hairlineWidth,

    }
})
