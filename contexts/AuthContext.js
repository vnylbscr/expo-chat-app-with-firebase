import React, { createContext, useState } from 'react';
import firebase from "firebase";
import { Alert } from 'react-native';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password);
                    } catch (error) {
                        if (error.code === "/auth/already-use") {
                            Alert.alert("Bu email zaten kullanımda");
                        }
                        Alert.alert(`Hata ${error.code}`);
                    }
                },
                register: async (email, password, username) => {
                    try {
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(async (res) => {
                                res.user.updateProfile({
                                    displayName: username
                                })
                            })
                            .catch(error => {
                                Alert.alert("Kullanıcı oluşturulamadı.");
                                console.log("Kullanıcı oluşturulamadı", error);
                            })
                    } catch (error) {
                        console.log(error);
                    }
                },
                logout: async () => {
                    try {
                        firebase.auth().signOut()
                            .then(() => {
                                Alert.alert("Çıkış yapıldı!");
                            })
                    } catch (error) {
                        console.log(error);
                    }
                }

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;