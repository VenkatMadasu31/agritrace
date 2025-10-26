import React, { useState } from "react";
import axios from "axios";

const DigilockerTest: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "otp" | "data">("phone");

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/send-otp", { phoneNumber });
      alert(res.data.message || "OTP sent!");
      setStep("otp");
    } catch (err: any) {
      alert("Error sending OTP: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/verify-otp", { phoneNumber, otp });
      setAccessToken(res.data.accessToken);
      alert("OTP verified!");
      setStep("data");
    } catch (err: any) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/fetch-data", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setData(res.data);
    } catch (err: any) {
      alert("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-md space-y-4">
        {step === "phone" && (
          <>
            <h2 className="text-xl font-semibold text-center mb-2">Enter your Phone Number</h2>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-xl font-semibold text-center mb-2">Enter OTP</h2>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 p-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {step === "data" && (
          <>
            <h2 className="text-xl font-semibold text-center mb-2">Fetch Mock Data</h2>
            <button
              onClick={handleFetchData}
              className="w-full bg-purple-600 p-2 rounded hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? "Fetching..." : "Fetch Data"}
            </button>
            {data && (
              <pre className="text-sm bg-gray-700 p-3 mt-3 rounded overflow-x-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DigilockerTest;
