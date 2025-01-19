import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8oeDkuXIa66iciceXxDstLezgsVbpQsQ",
  authDomain: "events-platform-595a1.firebaseapp.com",
  projectId: "events-platform-595a1",
  storageBucket: "events-platform-595a1.firebasestorage.app",
  messagingSenderId: "369564617115",
  appId: "1:369564617115:web:b3e111ed1635d48455f93e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);