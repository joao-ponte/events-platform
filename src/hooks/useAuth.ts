import { useState } from "react";
import { signInWithGoogle, logOut } from "../config/firebase";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [isStaff, setIsStaff] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    try {
      const { user, isStaff } = await signInWithGoogle();
      setUser(user);
      setIsStaff(isStaff);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setUser(null);
      setIsStaff(false);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return { user, isStaff, handleGoogleSignIn, handleSignOut, setUser, setIsStaff };
}
