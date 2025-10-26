import React from "react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col relative">
      {/* Top bar buttons */}
      <button className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
        Dashboard
      </button>
      <button className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Login
      </button>

      {/* Centered title */}
      <main className="flex-1 flex justify-center items-center">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-lg animate-pulse">
          Agritrace
        </h1>
      </main>
    </div>
  );
}

export default App;
