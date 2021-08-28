import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Button
} from 'react-native'
import firebase from 'firebase'
const CreateChatRoom = ({ navigation }) => {
    const [roomName, setRoomName] = useState()
    const db = firebase.firestore();
    const createRoomFirestore = () => {
        db.collection('MESSAGES_THREADS')
            .add({
                roomName: roomName,
                latestMessage: {
                    text: `${roomName} oluşturuldu.`,
                    createdAt: new Date().getTime()
                }
            })
            .then(() => navigation.navigate('ChatRoom', { roomName: roomName }))
    }
    return (

        <View style={styles.container}>

            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setRoomName(text)}
                placeholder="Oda İsmi"
            >
            </TextInput>
            <View style={{ marginTop: 20, width: 200 }}>
                <Button
                    title='Oda Oluştur'
                    disabled={!roomName}
                    onPress={createRoomFirestore}
                >
                </Button>

            </View>

        </View>
    )
}

export default CreateChatRoom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: '90%',
        height: 48,
        paddingHorizontal: 32,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8
    }
})
