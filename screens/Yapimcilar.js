import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Yapimcilar = () => {
    return (
        <View style={styles.container}>
            <Text>Mert Genç b161210045</Text>
            <Text>Kubilay Kaynan b161210102</Text>
        </View>
    )
}

export default Yapimcilar;
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
