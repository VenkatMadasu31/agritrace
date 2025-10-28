import React, { useState } from "react";
import axios from "axios";

const MockDigiLocker: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!phone) return alert("📱 Please enter your phone number!");
    if (!consent) return alert("⚠️ Please give your consent to proceed.");

    setLoading(true);
    setVerified(false);
    setUserDetails(null);

    try {
      // ✅ Backend API endpoint for verification
      const res = await axios.post("http://localhost:5000/consent/verify", {
        phone: phone,
      });

      console.log("📦 Full server response:", res.data); // Debug only

      // ✅ Store only user details (not tokens)
      if (res.data?.userDetails) {
        setUserDetails(res.data.userDetails);
        setVerified(true);
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
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT SIDE — Input Section */}
        <div>
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

        {/* RIGHT SIDE — Formatted User Data Display */}
        <div className="flex flex-col items-start justify-center bg-gray-50 border rounded-xl p-6 overflow-y-auto max-h-[75vh]">
          {!verified ? (
            <p className="text-gray-500 text-center w-full">
              🔒 Your DigiLocker data will appear here after verification.
            </p>
          ) : (
            <div className="w-full">
              <h2 className="text-xl font-semibold text-green-600 text-center mb-6">
                ✅ Verification Successful
              </h2>

              <div className="space-y-3 text-gray-800 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">📞 Phone:</span>
                  <span>{userDetails.phone}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">👤 Name:</span>
                  <span>{userDetails.name}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">🎂 Date of Birth:</span>
                  <span>{userDetails.dob}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">🏠 Address:</span>
                  <span className="text-right">{userDetails.permanentAddress}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">📮 Pincode:</span>
                  <span>{userDetails.pincode}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">🚻 Gender:</span>
                  <span>{userDetails.gender}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockDigiLocker;
