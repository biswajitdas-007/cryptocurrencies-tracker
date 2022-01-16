// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {collection, query, where, onSnapshot,doc,setDoc,addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDepjHL4jsZ5cbue7JSmKKU1uNsCyNCmIU",
  authDomain: "cryotocurrencies-tracker.firebaseapp.com",
  projectId: "cryotocurrencies-tracker",
  storageBucket: "cryotocurrencies-tracker.appspot.com",
  messagingSenderId: "230468172701",
  appId: "1:230468172701:web:b3654c1017311df1bc0d74",
  measurementId: "G-4B952GH3FL"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth()
const provider = new GoogleAuthProvider();

export { auth, provider, app, signInWithPopup,db,doc, setDoc,collection,addDoc, query, where, onSnapshot };