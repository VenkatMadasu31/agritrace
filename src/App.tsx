import React from "react";
import "./App.css";

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      {/* Top-left Dashboard button */}
      <button className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
        Dashboard
      </button>

      {/* Top-right Login button */}
      <button className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Login
      </button>

      {/* Centered title */}
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-lg animate-pulse">
          Agritrace
        </h1>
      </div>
    </div>
  );
}

export default App;
