// app/register/page.tsx
"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { BACKEND_API_URL } from "../../constants/apiConstants";
// import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // const router = useRouter();
  // const { login } = useAuth();

  type IRegisterData = {
    name: string;
    email: string;
    password: string;
    countryCode?: string;
    phoneNumber?: string;
    address: string;
    role: "USER";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!fullName || !email || !password || !confirm || !address) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const registerData: IRegisterData = {
        name: fullName,
        email,
        password,
        address,
        role: "USER", // always sign up as USER
      };

      if (countryCode) registerData.countryCode = countryCode;
      if (phoneNumber) registerData.phoneNumber = phoneNumber;

      const response = await fetch(`${BACKEND_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();
      if (response.ok) {
        // Show confirmation popup
        setShowConfirmation(true);
        setIsLoading(false);
      } else {
        setError(result.error || "Registration failed. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-[#027e3f]/5 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="backdrop-blur-sm bg-white/90 p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#027e3f]/20 max-w-md text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-700 mb-6">Please Login to your account.</p>
          <Link
            href="/login"
            className="inline-block bg-[#027e3f] hover:bg-[#026e37] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-[#027e3f]/5 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="backdrop-blur-sm bg-white/90 p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#027e3f]/20"
        >
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="w-16 h-16 bg-[#027e3f]/10 rounded-2xl mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#027e3f]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Create an account
            </h2>
            <p className="text-base text-gray-600">
              Fill in your details to get started
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#027e3f] hover:text-[#026e37] transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-50/50 text-red-600 text-sm mb-6 border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f]"
              />
            </div>

            {/* Country Code & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Country Code
                </label>
                <input
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  placeholder="+971"
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="501234567"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f]"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Dubai"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f]"
              />
            </div>

            {/* Submit Button */}
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
              {isLoading ? "Creating account..." : "Create account"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
