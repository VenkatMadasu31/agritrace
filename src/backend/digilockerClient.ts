import axios from "axios";

// Base URL of your mock server
const DIGILOCKER_BASE_URL = "http://localhost:5000";

export async function verifyConsent(authorizationCode: string) {
  try {
    const response = await axios.post(`${DIGILOCKER_BASE_URL}/verifyConsent`, {
      authorizationCode,
    });
    return response.data; // This will include success, tokens, and userDetails
  } catch (err) {
    console.error("❌ DigiLocker API Error:", err);
    return null;
  }
}
