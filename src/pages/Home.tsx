import { EventsList } from "../components/EventsList";
import "./home.scss";

export function Home() {
  return (
    <div className="home">
      <div className="header">
        <div className="logoContainer">
          <img className="logo" src="../public/logo.svg" alt="logo" />
          <h1>My events platform</h1>
        </div>
        <button className="signInButton">Sign in</button>
      </div>
      <EventsList />
    </div>
  );
}