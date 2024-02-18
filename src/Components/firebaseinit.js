// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore}from  "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsR10CrVHi0mTdqQFpoZ03cWcrMVkpZ_Q",
  authDomain: "blogging-app-c9b03.firebaseapp.com",
  projectId: "blogging-app-c9b03",
  storageBucket: "blogging-app-c9b03.appspot.com",
  messagingSenderId: "135422261011",
  appId: "1:135422261011:web:3e23478cabf4ede7e10ce6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app);