// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult as FirebaseConfirmationResult,
} from "firebase/auth";

// Extend window to include recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<FirebaseConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize invisible reCAPTCHA
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
  }, []);

  // Email login
  const handleEmailLogin = async () => {
    if (!email || !password) return alert("Enter email and password");
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Logged in with email!");
    } catch (err: any) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      alert("✅ Logged in with Google!");
    } catch (err: any) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!phoneNumber) return alert("Enter phone number");
    try {
      setLoading(true);
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert("✅ OTP sent!");
    } catch (err: any) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) return alert("Enter OTP");
    try {
      setLoading(true);
      await confirmationResult.confirm(otp);
      alert("✅ Logged in with phone!");
    } catch (err: any) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Login to Agritrace</h1>

        {/* Email login */}
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleEmailLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login with Email"}
          </button>
        </div>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login with Google"}
        </button>

        {/* Phone login */}
        <div className="space-y-2">
          <input
            type="tel"
            placeholder="Phone (+91XXXXXXXXXX)"
            className="w-full p-2 border rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            onClick={handleSendOtp}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            disabled={loading || confirmationResult !== null}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-2 border rounded"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-900"
                disabled={loading}
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </>
          )}
        </div>

        {/* reCAPTCHA container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default LoginPage;
