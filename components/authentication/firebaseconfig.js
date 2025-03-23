// firebaseconfig.js

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

// Your Firebase config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfsHJ1vODpQZI8HPbQrp1mC7chrBQ1CaY",
  authDomain: "blockcoder-8588d.firebaseapp.com",
  projectId: "blockcoder-8588d",
  storageBucket: "blockcoder-8588d.firebasestorage.app",
  messagingSenderId: "285022169306",
  appId: "1:285022169306:web:025f156c8a099dbc8cdde3",
  measurementId: "G-H39TB3VP6P"
};

// Initialize Firebase


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GithubAuthProvider();

export {
  auth,
  provider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
};
