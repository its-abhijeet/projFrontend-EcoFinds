"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [invalidCredsError, setInvalidCredsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login, user } = useAuth();

  // Handle redirection after successful login
  useEffect(() => {
    if (user?.role) {
      if (user.role === "SELLER") {
        router.push("/marketplace");
      } else if (user.role === "USER") {
        router.push("/marketplace");
      }
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setInvalidCredsError("");
    setIsLoading(true);

    let valid = true;

    if (!email) {
      setEmailError("Please enter your email");
      valid = false;
    } else if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    if (!password) {
      setPasswordError("Please enter your password");
      valid = false;
    }

    if (!valid) {
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(email, password);

      if (!success) {
        setInvalidCredsError(
          "Invalid email or password. Please verify your email and try again."
        );
      }
      // Redirection will be handled by the useEffect above
    } catch (error) {
      console.error("Login error:", error);
      setInvalidCredsError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_20%,rgba(2,126,63,0.08),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(2,126,63,0.05),transparent_45%)]"></div>
      <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>

      {/* Floating accent elements
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-slate-100/70 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-50/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-slate-100/70 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
       */}
      {/* Subtle floating dots
      <div className="absolute top-20 right-20 w-2 h-2 bg-[#027e3f]/20 rounded-full"></div>
      <div className="absolute top-40 left-[15%] w-3 h-3 bg-[#027e3f]/15 rounded-full"></div>
      <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-[#027e3f]/20 rounded-full"></div>
      <div className="absolute bottom-24 right-1/3 w-4 h-4 bg-[#027e3f]/10 rounded-full"></div> */}

      <div className="w-full max-w-[400px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="backdrop-blur-sm bg-white/80 p-8 sm:p-10 rounded-2xl shadow-xl border border-[#027e3f]/20 bg-gradient-to-b from-white to-[#f0f9f4] shadow-[#027e3f]/10"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome <span className="text-[#027e3f]">back</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f] transition-all duration-200 text-gray-900 placeholder-gray-400 text-base hover:border-[#027e3f]/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 flex items-center gap-1"
                >
                  {emailError}
                </motion.p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#027e3f]/20 focus:border-[#027e3f] transition-all duration-200 text-gray-900 placeholder-gray-400 text-base hover:border-[#027e3f]/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 flex items-center gap-1"
                >
                  {passwordError}
                </motion.p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#027e3f] focus:ring-[#027e3f]/30 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-[#027e3f] hover:text-[#026e37] transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            {invalidCredsError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-50/50 text-red-600 text-sm"
              >
                {invalidCredsError}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#027e3f] text-white py-2.5 rounded-xl text-base font-medium transition-all duration-200 
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#026e37] active:transform active:scale-[0.98] hover:shadow-lg"
                }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-[#027e3f] hover:text-[#026e37] transition-colors duration-200"
                >
                  Create one
                </a>
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
