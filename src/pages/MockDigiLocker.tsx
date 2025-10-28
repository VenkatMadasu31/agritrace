import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MockDigiLocker: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!phone) return alert("📱 Please enter your phone number!");
    if (!consent) return alert("⚠️ Please give your consent to proceed.");

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/consent/verify", {
        phone: phone,
      });

      if (res.data?.userDetails) {
        // ✅ Navigate to user details page with data
        navigate("/user-details", { state: { userDetails: res.data.userDetails } });
      } else {
        alert("⚠️ No user details found in response.");
      }
    } catch (err: any) {
      console.error("❌ Error verifying user:", err);
      alert(
        err.response?.data?.message || "⚠️ Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Mock DigiLocker Verification
        </h1>

        <div className="space-y-4">
          {/* Phone Input */}
          <input
            type="tel"
            placeholder="Enter your registered phone number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Consent Checkbox */}
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-gray-700 text-sm">
              I give consent to access my DigiLocker data for verification.
            </span>
          </label>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockDigiLocker;
