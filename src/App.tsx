import React from "react";
// import { seedFakeEvents } from "./seedEvents";

function App() {
  React.useEffect(() => {
    // seedFakeEvents();
  }, []);

  return (
    <div className="App">
      <h1>My Events App</h1>
      {/* The rest of your app */}
    </div>
  );
}

export default App;
