import React from 'react';
import firebase from 'firebase';
import { firebaseConfig } from './config';
import Provider from './screens/Provider';
//uygulamayı başlat

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default function App() {
  return (
    <Provider></Provider>
  );
}


