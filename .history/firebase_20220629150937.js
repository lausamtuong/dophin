// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCAcqoAFsghZ9NQtpWibjozVrBSjwPuwPs",
  authDomain: "chat-app-v4-80cc5.firebaseapp.com",
  projectId: "chat-app-v4-80cc5",
  storageBucket: "chat-app-v4-80cc5.appspot.com",
  messagingSenderId: "815127384825",
  appId: "1:815127384825:web:728f8c4698a8eecdf60828",
  measurementId: "G-B9G0DVVXWV"
};
const app = !getApps().length? initializeApp(firebaseConfig):getApp();
const db = getFirestore();
const storage = getStorage();
export {app,db,sto}
