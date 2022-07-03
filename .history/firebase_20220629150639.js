// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAcqoAFsghZ9NQtpWibjozVrBSjwPuwPs",
  authDomain: "chat-app-v4-80cc5.firebaseapp.com",
  projectId: "chat-app-v4-80cc5",
  storageBucket: "chat-app-v4-80cc5.appspot.com",
  messagingSenderId: "815127384825",
  appId: "1:815127384825:web:728f8c4698a8eecdf60828",
  measurementId: "G-B9G0DVVXWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);