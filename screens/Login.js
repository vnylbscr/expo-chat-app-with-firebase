import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native'
import { LoginSchema } from "../validation/LoginSchema";
import FormInput from '../components/FormInput';
import { useFormik } from "formik";
import { AuthContext } from '../contexts/AuthContext';
const Login = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: LoginSchema,
        initialValues: { email: '', password: '' },
        onSubmit: () => {
            login(values.email, values.password);
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
            <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16 }}>
                Giriş Yap
      </Text>
            <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                <FormInput
                    icon='person-outline'
                    placeholder='Emailini gir'
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
                    icon='person-outline'
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
            <Button title='Giriş Yap' onPress={handleSubmit} />

            <TouchableOpacity style={{ width: '100%', backgroundColor: '#fff', marginTop: 20 }}
                onPress={() => {
                    navigation.navigate('Register')
                }}>
                <Text style={{ textAlign: 'center', fontSize: 12 }}>Hesabın yok mu? Kayıt ol</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;
