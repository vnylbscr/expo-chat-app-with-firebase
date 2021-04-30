import React, { createContext, useState } from 'react';
import firebase from "firebase";
import {Alert} from 'react-native';
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
                        console.log(error);
                    }
                },
                register: async (email, password, username) => {
                    try {
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(res => {
                                res.user.updateProfile({
                                    displayName: username
                                })
                                .catch(error => console.log(error));
                            })
                            .catch(error => {
                                Alert.alert("Kullanıcı oluşturulamadı.");
                                console.log("Kullanıcı oluşturulamadı",error);
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