import React from "react";
import "./App.css"; // make sure Tailwind is imported here

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col">
      {/* Top bar */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
          Dashboard
        </button>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg animate-pulse">
          Agritrace
        </h1>
        <p className="text-white mt-4 text-lg drop-shadow-md">
          Your farm-to-fork traceability platform
        </p>

        {/* Example buttons below title */}
        <div className="mt-8 space-x-4">
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">
            Get Started
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
            Learn More
          </button>
        </div>
      </main>

      {/* Footer if needed */}
      <footer className="p-4 text-center text-white">
        &copy; {new Date().getFullYear()} Agritrace. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
