// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  type ConfirmationResult as FirebaseConfirmationResult,
} from "firebase/auth";

// Extend window type to include recaptchaVerifier
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
  const [confirmationResult, setConfirmationResult] =
    useState<FirebaseConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Initialize reCAPTCHA safely (correct parameter order)
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container", // ✅ element id first
          { size: "invisible" },  // ✅ config second
          auth                    // ✅ auth last
        );
        console.log("✅ reCAPTCHA initialized");
      } catch (err) {
        console.error("⚠️ Error initializing reCAPTCHA:", err);
      }
    }
  }, []);

  // ✅ Email login
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

  // ✅ Google login
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

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!phoneNumber) return alert("Enter phone number");
    try {
      setLoading(true);
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert("✅ OTP sent!");
    } catch (err: any) {
      console.error(err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) return alert("Enter OTP");
    try {
      setLoading(true);
      await confirmationResult.confirm(otp);
      alert("✅ Logged in with phone!");
    } catch (err: any) {
      console.error(err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Login to Agritrace
        </h1>

        {/* ===== EMAIL LOGIN ===== */}
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleEmailLogin}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login with Email"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-1/4 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="w-1/4 h-px bg-gray-300"></div>
        </div>

        {/* ===== GOOGLE LOGIN ===== */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2.5 rounded-lg hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-1/4 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="w-1/4 h-px bg-gray-300"></div>
        </div>

        {/* ===== PHONE LOGIN ===== */}
        <div className="space-y-3">
          <input
            type="tel"
            placeholder="Phone (+91XXXXXXXXXX)"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-green-400 outline-none"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            onClick={handleSendOtp}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition"
            disabled={loading || confirmationResult !== null}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-400 outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-800 text-white py-2.5 rounded-lg hover:bg-green-900 transition"
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
