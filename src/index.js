import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Initialize Firebase
const app = firebase.initializeApp({
  apiKey: "AIzaSyAGdFa1P0WhPI-9bw1C2EImNjFy88v-hT4",
  authDomain: "chat-react-be39d.firebaseapp.com",
  projectId: "chat-react-be39d",
  storageBucket: "chat-react-be39d.appspot.com",
  messagingSenderId: "135501839306",
  appId: "1:135501839306:web:aa40668e858fb9b089ad33",
  measurementId: "G-C53B4GRZRM"
});

export const Context = createContext();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{app, auth, firestore}}>
    <App />
  </Context.Provider>
);