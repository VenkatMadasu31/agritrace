import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const UserDetailsPage: React.FC = () => {
  const location = useLocation();
  const userData = location.state?.userDetails;

  const [presentAddress, setPresentAddress] = useState("");
  const [isDifferentAddress, setIsDifferentAddress] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!profilePic)
      return alert("⚠️ Please upload a profile picture before proceeding!");

    if (isDifferentAddress && !presentAddress)
      return alert("⚠️ Please fill your present address!");

    alert("✅ All details successfully submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          User Details (Auto-filled from DigiLocker)
        </h1>

        <form className="space-y-4">
          {/* Profile Picture */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Profile Picture <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded"
              onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
            />
          </div>

          {/* User Details (readonly) */}
          {[
            { label: "Phone", value: userData.phone },
            { label: "Name", value: userData.name },
            { label: "Date of Birth", value: userData.dob },
            { label: "Gender", value: userData.gender },
            { label: "Permanent Address", value: userData.permanentAddress },
            { label: "Pincode", value: userData.pincode },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block font-semibold text-gray-700 mb-1">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={field.value}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          ))}

          {/* Checkbox for different address */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isDifferentAddress}
              onChange={(e) => setIsDifferentAddress(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <label className="text-gray-700">
              Permanent address is not my present address
            </label>
          </div>

          {/* Present Address (editable only if checked) */}
          {isDifferentAddress && (
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Present Address <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Enter your present address"
                value={presentAddress}
                onChange={(e) => setPresentAddress(e.target.value)}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsPage;
