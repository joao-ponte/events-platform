import { useState } from "react";
import { EventsList } from "../components/EventsList";
import { signInWithGoogle, logOut } from "../config/firebase";
import "./home.scss";

export function Home() {
  const [user, setUser] = useState<any>(null);

  const handleSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      setUser(userData);
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="home">
      <header className="header">
        <div className="logo-container">
          <img className="logo" src="../public/logo.svg" alt="My Events Platform Logo" />
          <h1>My Events Platform</h1>
        </div>
        <div className="auth-buttons">
          {user ? (
            <>
              <p className="welcome-message">Welcome, {user.displayName}!</p>
              <button className="sign-out-button" onClick={handleSignOut}>
                Sign out
              </button>
            </>
          ) : (
            <button className="sign-in-button" onClick={handleSignIn}>
              Sign in with Google
            </button>
          )}
        </div>
      </header>
      <main>
        <EventsList user={user} />
      </main>
    </div>
  );
}
