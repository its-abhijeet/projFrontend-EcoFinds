// app/verify/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BACKEND_API_URL } from "@/constants/apiConstants";
import { useAuth } from "@/context/AuthContext";

export default function Verify() {
  const [businessType, setBusinessType] = useState("");
  const [businessDesc, setBusinessDesc] = useState("");
  const [doc, setDoc] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { authFetch, token, logout } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!businessType || !businessDesc) {
      setError("Please select a business type and enter a description.");
      return;
    }
    if (!doc) {
      setError("Please upload a document before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      // 1) Upload the file to S3 via your file‐upload endpoint
      const form = new FormData();
      form.append("businessType", businessType);
      form.append("businessDesc", businessDesc);
      form.append("file", doc);

      const uploadRes = await authFetch(
        `${BACKEND_API_URL}/files/upload-verification-doc`,
        {
          method: "POST",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: form, // browser sets Content-Type: multipart/form-data
        }
      );

      const uploadBody = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(
          uploadBody.error || "Document upload failed. Please try again."
        );
      }

      const { verificationDocUrl } = uploadBody as {
        verificationDocUrl: string;
      };

      // 2) Now send your business details + the returned URL
      const verifyRes = await authFetch(`${BACKEND_API_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          businessType,
          businessDesc,
          verificationDocUrl,
        }),
      });

      const verifyBody = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyBody.error || "Verification failed.");
      }

      // 3) Success!
      setSuccess("Document submitted successfully!");
      logout(); // force re-login so they pick up “seller” role
      setShowModal(true);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-[#027e3f]/5 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="backdrop-blur-sm bg-white/90 p-8 rounded-3xl shadow-2xl border border-[#027e3f]/20 bg-gradient-to-br from-white via-[#f9fdf9] to-[#ecf7ef]"
        >
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Profile
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Business Verification
          </h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-50/50 text-red-600 text-sm mb-6 border border-red-100"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-green-50/50 text-green-700 text-sm mb-6 border border-green-100"
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Business Type<span className="text-red-500">*</span>
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f]"
              >
                <option value="">Select type</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Retailer">Retailer</option>
                <option value="Distributor">Distributor</option>
                <option value="Service Provider">Service Provider</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Business Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Business Description<span className="text-red-500">*</span>
              </label>
              <textarea
                value={businessDesc}
                onChange={(e) => setBusinessDesc(e.target.value)}
                placeholder="Describe your business..."
                rows={4}
                className="w-full mt-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f]"
              />
            </div>

            {/* File Picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Verification Document
                <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-[#027e3f]/40 transition-colors duration-200">
                <div className="space-y-2 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12 a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="verify-upload"
                      className="relative cursor-pointer font-semibold text-[#027e3f] hover:text-[#026e37]"
                    >
                      <span>Choose a file</span>
                      <input
                        id="verify-upload"
                        type="file"
                        accept=".pdf,.png,.jpg"
                        className="sr-only"
                        onChange={(e) =>
                          setDoc(e.target.files ? e.target.files[0] : null)
                        }
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, PNG, JPG up to 10 MB
                  </p>
                  {doc && (
                    <p className="mt-2 text-sm text-[#027e3f] font-medium">
                      Selected: {doc.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#027e3f] text-white py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#026e37] hover:shadow-lg"
              }`}
            >
              {isLoading ? "Uploading…" : "Submit for Verification"}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
            <div className="text-green-600 text-2xl font-bold mb-2">
              Success!
            </div>
            <div className="mb-4">
              Your document was submitted successfully.
              <br />
              You are now a seller.
              <br />
              Please login again to continue.
            </div>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
