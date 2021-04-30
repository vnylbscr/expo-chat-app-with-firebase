import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthProvider from '../contexts/AuthContext'
import Loading from './Loading'

const Provider = () => {
    return (
        <AuthProvider>
            <Loading />
        </AuthProvider>
    )
}

export default Provider

const styles = StyleSheet.create({})
