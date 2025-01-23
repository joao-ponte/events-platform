// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8oeDkuXIa66iciceXxDstLezgsVbpQsQ",
  authDomain: "events-platform-595a1.firebaseapp.com",
  projectId: "events-platform-595a1",
  storageBucket: "events-platform-595a1.appspot.com",
  messagingSenderId: "369564617115",
  appId: "1:369564617115:web:b3e111ed1635d48455f93e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Google Sign-In
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Returns the signed-in user
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

// Sign Out
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};
