// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<FirebaseConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Initialize reCAPTCHA for phone login only
  useEffect(() => {
    if (!window.recaptchaVerifier && auth) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal", // visible reCAPTCHA (bottom)
            callback: () => console.log("✅ Phone reCAPTCHA solved"),
            "expired-callback": () => {
              alert("⚠️ reCAPTCHA expired, please verify again.");
            },
          }
        );
        window.recaptchaVerifier.render();
        console.log("✅ Visible Phone reCAPTCHA initialized");
      } catch (err) {
        console.error("⚠️ Error initializing reCAPTCHA:", err);
      }
    }
  }, []);

  // ✅ Email Auth (Login / Signup)
  const handleEmailAuth = async () => {
    if (!email || !password) return alert("Enter email and password");

    try {
      setLoading(true);
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Logged in successfully!");
      }
    } catch (err: any) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Auth
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      alert(isSignup ? "✅ Account created with Google!" : "✅ Logged in with Google!");
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
      alert(isSignup ? "✅ Phone signup successful!" : "✅ Logged in with phone!");
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
          {isSignup ? "Create Account" : "Login to Agritrace"}
        </h1>

        {/* ===== EMAIL AUTH ===== */}
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
            onClick={handleEmailAuth}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading
              ? isSignup
                ? "Creating..."
                : "Logging in..."
              : isSignup
              ? "Sign Up with Email"
              : "Login with Email"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-1/4 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="w-1/4 h-px bg-gray-300"></div>
        </div>

        {/* ===== GOOGLE AUTH ===== */}
        <button
          onClick={handleGoogleAuth}
          className="w-full bg-red-500 text-white py-2.5 rounded-lg hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading
            ? isSignup
              ? "Creating with Google..."
              : "Logging in..."
            : isSignup
            ? "Sign Up with Google"
            : "Login with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-1/4 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="w-1/4 h-px bg-gray-300"></div>
        </div>

        {/* ===== PHONE AUTH ===== */}
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
                {loading
                  ? isSignup
                    ? "Verifying Signup..."
                    : "Verifying Login..."
                  : isSignup
                  ? "Sign Up with OTP"
                  : "Login with OTP"}
              </button>
            </>
          )}
        </div>

        {/* ✅ Only one visible reCAPTCHA now */}
        <div id="recaptcha-container" className="flex justify-center mt-4"></div>

        {/* ===== MODE TOGGLE ===== */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            {isSignup ? "Already have an account?" : "New user?"}{" "}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setConfirmationResult(null);
              }}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isSignup ? "Login here" : "Sign up here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
