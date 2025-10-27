import React, { useState } from "react";

const MockDigiLocker: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 📡 Function to verify using Mock DigiLocker API
  const handleVerify = async () => {
    if (!phone) return alert("📱 Please enter your phone number!");
    if (!consent) return alert("⚠️ Please give your consent to proceed.");

    setLoading(true);
    setVerified(false);
    setUserData(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:5000/mock-digilocker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) throw new Error("Server error, please try again later.");

      const data = await response.json();

      if (data?.userDetails) {
        setUserData(data.userDetails);
        setVerified(true);
      } else {
        alert("❌ User not found. Please check your phone number.");
      }
    } catch (err: any) {
      console.error("Error verifying user:", err);
      alert("⚠️ Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
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

        {/* RIGHT SIDE — DigiLocker Data Display */}
        <div className="flex flex-col items-center justify-center bg-gray-50 border rounded-xl p-6">
          {!verified ? (
            <p className="text-gray-500 text-center">
              🔒 Your DigiLocker data will appear here after verification.
            </p>
          ) : (
            <div className="w-full space-y-3">
              <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
                ✅ Verification Successful
              </h2>

              {userData && (
                <ul className="text-gray-700 space-y-2">
                  <li>
                    <strong>Name:</strong> {userData.name}
                  </li>
                  <li>
                    <strong>DOB:</strong> {userData.dob}
                  </li>
                  <li>
                    <strong>Aadhaar:</strong> {userData.aadhaarNumber}
                  </li>
                  <li>
                    <strong>Gender:</strong> {userData.gender}
                  </li>
                  <li>
                    <strong>Phone:</strong> {userData.phone}
                  </li>
                  <li>
                    <strong>Address:</strong> {userData.permanentAddress}
                  </li>
                  <li>
                    <strong>Pincode:</strong> {userData.pincode}
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockDigiLocker;
