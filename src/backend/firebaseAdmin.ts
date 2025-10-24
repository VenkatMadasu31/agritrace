import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

console.log("FIREBASE_SERVICE_ACCOUNT_PATH:", process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
const serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH as string);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

console.log("✅ Firebase Admin Connected Successfully");

export const bucket = admin.storage().bucket();
export const firestore = admin.firestore();
export const auth = admin.auth();
