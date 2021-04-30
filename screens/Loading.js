import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from "firebase";
import { AuthContext } from '../contexts/AuthContext';
import AppStack from '../navigation/AppStack';
import Root from '../navigation/Root';
const Loading = () => {
    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;
    return (
        user ? (<AppStack></AppStack>) : (<Root></Root>)
    )
}

export default Loading;
