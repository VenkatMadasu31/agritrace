import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./firebaseConfig";
import DigilockerTest from "./pages/TestDigilocker";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center py-6">
          <div className="flex space-x-4">
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>AgriTrace + Mock Digilocker</h1>

          {/* Navigation */}
          <nav className="mt-4 space-x-4">
            <Link to="/" className="text-blue-500 hover:underline">
              Home
            </Link>
            <Link to="/digilocker-test" className="text-green-500 hover:underline">
              Digilocker Test
            </Link>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="card text-center">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
                <p className="read-the-docs">
                  Click on the Vite and React logos to learn more
                </p>
              </div>
            }
          />

          {/* Digilocker Test Page */}
          <Route path="/digilocker-test" element={<DigilockerTest />} />
        </Routes>
      </div>
    </Router>
  );
}

console.log("AgriTrace connected with Mock Digilocker successfully ✅");

export default App;
