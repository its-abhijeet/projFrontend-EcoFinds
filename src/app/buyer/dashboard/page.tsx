"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import BuyerDashboardHome from "./Home";
import { useRouter } from "next/navigation";

// import Link from 'next/link';

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("buyer-sidebar");
      const toggle = document.getElementById("sidebar-toggle");

      if (
        sidebar &&
        toggle &&
        !sidebar.contains(event.target as Node) &&
        !toggle.contains(event.target as Node) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {user?.isDocumentVerified ? (
        <div className="min-h-screen flex bg-gray-50">
          {/* Horizontal Mobile Navigation */}
          <div className="fixed top-[64px] left-0 right-0 z-40 lg:hidden bg-gradient-to-r from-[#1B442E] to-[#2C5A3F] shadow-md">
            <div className="flex justify-between items-center px-4 py-2 border-t border-[#ffffff1a]">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ${
                  activeTab === "home"
                    ? "text-white bg-white/20"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-xs mt-1">Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ${
                  activeTab === "orders"
                    ? "text-white bg-white/20"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="text-xs mt-1">Orders</span>
              </button>

              <button
                onClick={() => setActiveTab("products")}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ${
                  activeTab === "products"
                    ? "text-white bg-white/20"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span className="text-xs mt-1">Products</span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ${
                  activeTab === "profile"
                    ? "text-white bg-white/20"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
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
                <span className="text-xs mt-1">Profile</span>
              </button>
            </div>
          </div>

          {/* Full Sidebar (desktop only) */}
          <aside
            id="buyer-sidebar"
            className={`w-64 sm:w-72 bg-gradient-to-b from-[#1B442E] to-[#2C5A3F] text-white min-h-screen fixed left-0 top-0 z-30 shadow-xl transform transition-transform duration-300 ease-in-out hidden lg:block lg:translate-x-0`}
          >
            <div className="p-4 sm:p-6 border-b border-[#ffffff1a] flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Buyer Panel</h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  {user?.email}
                </p>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("home");
                    }}
                    className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                      activeTab === "home"
                        ? "bg-white/10 text-white font-medium"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("orders");
                    }}
                    className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                      activeTab === "orders"
                        ? "bg-white/10 text-white font-medium"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span>My Orders</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("products");
                    }}
                    className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                      activeTab === "products"
                        ? "bg-white/10 text-white font-medium"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span>Browse Products</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("profile");
                    }}
                    className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                      activeTab === "profile"
                        ? "bg-white/10 text-white font-medium"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
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
                    <span>My Profile</span>
                  </button>
                </li>
              </ul>

              <div className="pt-6 mt-6 sm:pt-8 sm:mt-8 border-t border-[#ffffff1a]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-0 lg:ml-72 min-h-screen bg-gray-50 pt-28 pb-16 sm:pt-28 lg:pt-4 lg:pb-0">
            <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto">
              {activeTab !== "home" && (
                <div className="mb-4 sm:mb-8">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {activeTab === "orders" && "My Orders"}
                    {activeTab === "products" && "Available Products"}
                    {activeTab === "profile" && "My Profile"}
                  </h1>
                  <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
                    {activeTab === "orders" && "Track and manage your orders."}
                    {activeTab === "products" &&
                      "Browse and purchase recycled products."}
                    {activeTab === "profile" &&
                      "View and update your profile information."}
                  </p>
                </div>
              )}

              {activeTab === "home" && <BuyerDashboardHome />}
              {activeTab === "orders" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Orders
                        </p>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                          0
                        </h3>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-indigo-600">0%</span>
                        <span className="mx-2">vs</span>
                        <span>Last month</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Spent
                        </p>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                          ₹0.00
                        </h3>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-purple-600">0%</span>
                        <span className="mx-2">vs</span>
                        <span>last month</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Saved Items
                        </p>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                          0
                        </h3>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-orange-600">0%</span>
                        <span className="mx-2">vs</span>
                        <span>last month</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900">
                      Recent Orders
                    </h3>
                    <div className="mt-6 text-center text-gray-500">
                      <svg
                        className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      <p className="mt-4 text-sm">
                        No orders yet. Start shopping to see your orders here.
                      </p>
                      <button
                        onClick={() => setActiveTab("products")}
                        className="mt-4 inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Browse Products
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "products" && (
                <div className="grid grid-cols-1 gap-6">
                  <div className="col-span-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        Featured Products
                      </h3>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                          Filter
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                          Sort
                        </button>
                      </div>
                    </div>
                    <div className="text-center py-10 sm:py-12">
                      <svg
                        className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900">
                        Products Coming Soon
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-gray-600">
                        We&apos;re working on bringing you a great selection of
                        recycled products.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "profile" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:scale-105 transition-transform duration-200 cursor-pointer"
                    onClick={() => router.push("../profile")}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600"
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
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Personal Information
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Update your personal details and preferences
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Account Security
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Manage your password and security settings
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Payment Methods
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Add and manage your payment methods
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Purchase History
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          View your order history and receipts
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">
              Account Verification Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please complete your account verification to access the seller
              dashboard.
            </p>
            <button
              onClick={() => router.push("/profile/verify")}
              className="w-full bg-[#027e3f] text-white py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-[#026e37] hover:shadow-lg"
            >
              Go to Verification
            </button>
          </div>
        </div>
      )}
    </>
  );
}
