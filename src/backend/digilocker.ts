// src/lib/digilocker.ts
export async function verifyConsentByPhone(phone: string) {
  const proxyBase = import.meta.env.VITE_DIGILOCKER_PROXY || "/digilocker";
  const url = `${proxyBase}/consent/verify`;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phone })
  });

  // If non-2xx, surface the error message body if present
  if (!resp.ok) {
    let errText = await resp.text().catch(() => "");
    try {
      const errJson = JSON.parse(errText || "{}");
      throw new Error(errJson.message || `Digilocker error ${resp.status}`);
    } catch {
      throw new Error(errText || `Digilocker error ${resp.status}`);
    }
  }

  return resp.json();
}
