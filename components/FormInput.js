import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const FormInput = ({ icon, touched, error, ...otherProps }) => {
    const validationColor = !touched ? '#223e4b' : error ? '#FF5A5F' : '#223e4b';
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                borderRadius: 8,
                borderColor: validationColor,
                borderWidth: StyleSheet.hairlineWidth,
                padding: 8
            }}
        >
            <View style={{ padding: 8 }}>
                <Ionicons name={icon} color={validationColor} size={20} />
            </View>
            <View style={{ flex: 1 }}>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholderTextColor='rgba(34, 62, 75, 0.7)'
                    {...otherProps}
                />
                {/* {error && <Text style={{ color: 'red', marginTop: 5, fontSize: 9 }}>{error}</Text>} */}

            </View>
        </View>
    )
}

export default FormInput

const styles = StyleSheet.create({

})
