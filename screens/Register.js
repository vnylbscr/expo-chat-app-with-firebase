import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native'
import { RegisterSchema } from '../validation/RegisterSchema';
import FormInput from '../components/FormInput';
import { useFormik } from "formik";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
const Register = ({ navigation }) => {
    const { register } = useContext(AuthContext);
    const {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: RegisterSchema,
        initialValues: { email: '', username: '', password: '' },
        onSubmit: values => {
            register(values.email, values.password, values.username);
        }

    });
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text style={{ color: 'blue', fontSize: 18 }}>Chat App Ag Programlama</Text>
            <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16 }}>
                Kayıt Ol
      </Text>
            <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                <FormInput
                    icon='person-outline'
                    placeholder='Email adresini gir'
                    autoCapitalize='none'
                    autoCompleteType='email'
                    keyboardType='email-address'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                />
            </View>
            <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                <FormInput
                    icon='person-circle-outline'
                    placeholder='Kullanıcı adını gir'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    error={errors.username}
                    touched={touched.username}
                />
            </View>
            <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                <FormInput
                    icon='lock-closed-outline'
                    placeholder='Şifreni gir'
                    secureTextEntry={true}
                    autoCompleteType='password'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='go'
                    returnKeyLabel='go'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={errors.password}
                    touched={touched.password}
                />
            </View>
            <Button title='Kayıt Ol' onPress={handleSubmit} />

            <TouchableOpacity style={{ width: '100%', height: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                onPress={() => {
                    navigation.navigate('Login')
                }}>
                <Text style={{ fontSize: 12, color: "#007998" }}>Hesabın Var Mı? Giriş yap</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register;

