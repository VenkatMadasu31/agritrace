import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// ✅ Import Pages
import LoginPage from "./pages/LoginPage";
import MockDigiLocker from "./pages/MockDigiLocker";
import UserDetailsPage from "./pages/UserDetailsPage"; // ✅ New Page

// 🏡 Home Component
function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      {/* Top-left Dashboard button (not linked yet) */}
      <button className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
        Dashboard
      </button>

      {/* Top-right Login button */}
      <button
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate("/login")}
      >
        Login
      </button>

      {/* Centered Title */}
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-lg animate-pulse">
          Agritrace
        </h1>
      </div>
    </div>
  );
}

// 🌱 Main App Component with Routes
function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Home Page */}
        <Route path="/" element={<Home />} />

        {/* 🔐 Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🪪 Mock DigiLocker Verification */}
        <Route path="/mock-digilocker" element={<MockDigiLocker />} />

        {/* 👤 User Details (Auto-filled from DigiLocker) */}
        <Route path="/user-details" element={<UserDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
