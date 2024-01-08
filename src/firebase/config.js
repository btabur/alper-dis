// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCex25W5zMIaXaA1k-evArO9gbE9SmWbJ8",
  authDomain: "alper-dis.firebaseapp.com",
  projectId: "alper-dis",
  storageBucket: "alper-dis.appspot.com",
  messagingSenderId: "1038304649269",
  appId: "1:1038304649269:web:79eea04a6d1148bcbfd17c",
  measurementId: "G-DGEP0RY144"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//auth referansını alma
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

//veritabanı referansını alma

export const db = getFirestore(app)