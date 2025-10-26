import React from "react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 relative">
      {/* Top-left Dashboard button */}
      <div className="absolute top-4 left-4">
        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
          Dashboard
        </button>
      </div>

      {/* Top-right Login button */}
      <div className="absolute top-4 right-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </div>

      {/* Centered title */}
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-lg animate-pulse">
          Agritrace
        </h1>
      </div>
    </div>
  );
}

export default App;
