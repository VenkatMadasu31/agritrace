import { useState } from "react";
import { verifyConsentByPhone } from "../backend/digilocker";

export default function TestDigilocker() {
  const [phone, setPhone] = useState("9998887776");
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    setErr(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await verifyConsentByPhone(phone);
      setResult(res);
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Test DigiLocker</h2>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={handleVerify} disabled={loading} style={{ marginLeft: 8 }}>
        {loading ? "Calling..." : "Verify Consent"}
      </button>

      {err && <pre style={{ color: "crimson" }}>{err}</pre>}

      {result && (
        <div style={{ marginTop: 12 }}>
          <h3>Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
