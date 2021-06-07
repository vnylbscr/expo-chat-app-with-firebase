import React, { useContext } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
const Profile = () => {
    const { user } = useContext(AuthContext);
    // const auth = firebase.auth().currentUser;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {user.displayName}
            </Text>
            <Text style={styles.email}>
                {user.email}
            </Text>
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize:24,
    },
    email:{
        fontSize:20
    }

})