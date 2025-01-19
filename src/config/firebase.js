// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <-- Import getAuth here

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPzyxYt8J-YyShQ1Lg8meTeB1IEQME2kE",
  authDomain: "limoney-8a1e8.firebaseapp.com",
  projectId: "limoney-8a1e8",
  storageBucket: "limoney-8a1e8.appspot.com",
  messagingSenderId: "106890729846",
  appId: "1:106890729846:web:a26ec9bde746a7339f0257",
  measurementId: "G-KKDTF1QS9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);
