// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8oeDkuXIa66iciceXxDstLezgsVbpQsQ",
  authDomain: "events-platform-595a1.firebaseapp.com",
  projectId: "events-platform-595a1",
  storageBucket: "events-platform-595a1.appspot.com",
  messagingSenderId: "369564617115",
  appId: "1:369564617115:web:b3e111ed1635d48455f93e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { user: result.user, isStaff: false };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const signInStaff = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, isStaff: true };
  } catch (error) {
    console.error("Staff Sign-In Error:", error);
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
