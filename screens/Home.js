import React, { useContext} from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import { AuthContext } from '../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');
//LogBox.ignoreLogs(['Setting a timer']);
const Home = () => {
    const { user } = useContext(AuthContext);
    return (
        <LinearGradient colors={['#ffe9d6', '#a7d0cd', '#7b6079']} style={styles.backGround}>
            <Text style={{ fontSize: 25 }}>Henüz bir bildirim yok!</Text>
        </LinearGradient>
    )
}

export default Home;

const styles = StyleSheet.create({
    backGround: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    }
})