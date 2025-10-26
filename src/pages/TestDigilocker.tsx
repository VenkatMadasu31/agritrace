import React, { useState } from "react";
import axios from "axios";

const DigilockerTest: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/consent/verify", {
        phone: phoneNumber,
      });
      setData(res.data.userDetails);
    } catch (err: any) {
      alert(
        err.response?.data?.message || "Error fetching data. User not found."
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-center mb-2">
          Fetch Mock DigiLocker Data
        </h2>

        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button
          onClick={handleFetchData}
          className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Data"}
        </button>

        {data && (
          <div className="mt-4 bg-gray-700 p-3 rounded">
            <h3 className="font-semibold mb-2">User Details:</h3>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigilockerTest;
