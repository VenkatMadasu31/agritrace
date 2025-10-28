// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWoodytPPrqjq_ogiKZZQ_QQZfdyOYCFk",
  authDomain: "blockchain-system-agriculture.firebaseapp.com",
  projectId: "blockchain-system-agriculture",
  storageBucket: "blockchain-system-agriculture.firebasestorage.app",
  messagingSenderId: "755896940513",
  appId: "1:755896940513:web:4603a7b3eab662d9da44a0",
  measurementId: "G-3WTR575Q45",
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Optional Analytics (only works in supported browsers)
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
    console.log("📊 Firebase Analytics Enabled");
  } else {
    console.log("⚠️ Analytics not supported in this environment");
  }
});

// ✅ Firebase Auth
const auth = getAuth(app);

// ✅ Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// ✅ Firestore DB
const db = getFirestore(app);

// ✅ Export only these (no RecaptchaVerifier export)
export { app, auth, db, googleProvider };

console.log("✅ Firebase Connected Successfully (Frontend)");
