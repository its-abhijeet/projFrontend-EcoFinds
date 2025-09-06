"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";
import Image from "next/image";
import {
  Building2,
  LayoutDashboard,
  ShoppingCart,
  DollarSign,
  Coins,
  RefreshCw,
  AlertTriangle,
  Menu,
} from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const {
    currency,
    setCurrency,
    isLoading,
    refreshRates,
    lastUpdated,
    rateSource,
    hasRates,
  } = useCurrency();
  const userRole = user?.role;

  const menuRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const companyTimer = useRef<NodeJS.Timeout | null>(null);
  const dashboardTimer = useRef<NodeJS.Timeout | null>(null);
  const currencyTimer = useRef<NodeJS.Timeout | null>(null);
  const profileTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        event.target instanceof Node &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (
    setter: (v: boolean) => void,
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setter(true);
  };
  const handleMouseLeave = (
    setter: (v: boolean) => void,
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    timerRef.current = setTimeout(() => setter(false), 200);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    window.location.href = "/";
  };

  const getDashboardOptions = () => {
    if (!isAuthenticated || !userRole) return [];
    if (userRole === "USER") {
      return [
        { href: "/buyer/dashboard", label: "Buyer Dashboard" },
        { href: "/seller/dashboard", label: "Seller Dashboard" },
      ];
    }
    if (userRole === "SELLER") {
      return [
        { href: "/buyer/dashboard", label: "Buyer Dashboard" },
        { href: "/seller/dashboard", label: "Seller Dashboard" },
      ];
    }
    return [];
  };
  const dashboardOptions = getDashboardOptions();

  const currencyOptions = [
    { value: "USD" as const, label: "USD ($)", symbol: "$" },
    { value: "INR" as const, label: "INR (₹)", symbol: "₹" },
    { value: "EUR" as const, label: "EUR (€)", symbol: "€" },
    { value: "GBP" as const, label: "GBP (£)", symbol: "£" },
  ];

  return (
    <nav className="bg-white text-gray-800 shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
        >
          <Image
            src="/logo2.png"
            alt="Eco Finds Logo"
            width={100}
            height={150}
            className="h-12 sm:h-16 w-auto"
            priority
          />
        </Link>

        {/* Desktop Center Menu */}
        <div className="hidden lg:flex lg:items-center lg:flex-row lg:static lg:bg-transparent lg:shadow-none gap-4 lg:gap-10 mx-auto font-sans">
          {/* Company dropdown */}
          <div
            ref={companyRef}
            onMouseEnter={() => handleMouseEnter(setCompanyOpen, companyTimer)}
            onMouseLeave={() => handleMouseLeave(setCompanyOpen, companyTimer)}
            className="relative"
          >
            <button className="group px-3 py-2 text-[15px] font-medium flex items-center gap-2 hover:text-[#027e3f] transition-colors">
              <Building2 className="w-5 h-5 text-current" />
              <span>Company</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1.5 transition-transform duration-200 ${
                  companyOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {companyOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 transform opacity-100 scale-100 transition-all duration-200 ease-out origin-top-left">
                {[
                  { href: "/aboutus", label: "About Us" },
                  { href: "/contact", label: "Contact Us" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-4 py-2.5 text-[15px] hover:bg-[#027e3f]/5 hover:text-[#027e3f] transition-all duration-200 first:rounded-t-lg last:rounded-b-lg relative group"
                  >
                    <span className="relative z-10">{label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#027e3f]/0 via-[#027e3f]/5 to-[#027e3f]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dashboard dropdown */}
          {isAuthenticated && (
            <div
              ref={dashboardRef}
              onMouseEnter={() =>
                handleMouseEnter(setDashboardOpen, dashboardTimer)
              }
              onMouseLeave={() =>
                handleMouseLeave(setDashboardOpen, dashboardTimer)
              }
              className="relative"
            >
              <button className="group px-3 py-2 text-[15px] font-medium flex items-center gap-2 hover:text-[#027e3f] transition-colors">
                <LayoutDashboard className="w-5 h-5 text-current" />
                <span>Dashboard</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1.5 transition-transform duration-200 ${
                    dashboardOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dashboardOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 transform opacity-100 scale-100 transition-all duration-200 ease-out origin-top-left">
                  {dashboardOptions.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-4 py-2.5 text-[15px] hover:bg-[#027e3f]/5 hover:text-[#027e3f] transition-all duration-200 first:rounded-t-lg last:rounded-b-lg relative group"
                    >
                      <span className="relative z-10">{label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#027e3f]/0 via-[#027e3f]/5 to-[#027e3f]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Marketplace link */}
          <Link
            href="/marketplace"
            className="group px-3 py-2 text-[15px] font-medium flex items-center gap-2 hover:text-[#027e3f] transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-current" />
            <span>Marketplace</span>
          </Link>

          {/* Currency Selector */}
          <div
            ref={currencyRef}
            onMouseEnter={() =>
              handleMouseEnter(setCurrencyOpen, currencyTimer)
            }
            onMouseLeave={() =>
              handleMouseLeave(setCurrencyOpen, currencyTimer)
            }
            className="relative"
          >
            <button className="group px-3 py-2 text-[15px] font-medium flex items-center gap-2 hover:text-[#027e3f] transition-colors">
              <Coins
                className={`w-5 h-5 text-current ${
                  isLoading
                    ? "animate-pulse"
                    : !hasRates
                    ? "text-orange-500"
                    : ""
                }`}
              />
              <span>Currency</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1.5 transition-transform duration-200 ${
                  currencyOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {currencyOpen && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 transform opacity-100 scale-100 transition-all duration-200 ease-out origin-top-right">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">
                      Exchange Rates
                    </span>
                    <button
                      onClick={refreshRates}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      disabled={isLoading}
                    >
                      <RefreshCw
                        className={`w-4 h-4 text-gray-500 ${
                          isLoading ? "animate-spin" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Source: {rateSource}</span>
                    <span>•</span>
                    <span>Updated: {lastUpdated}</span>
                  </div>
                </div>

                {!hasRates && (
                  <div className="px-4 py-2 flex items-center gap-2 text-orange-600 bg-orange-50">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Exchange rates unavailable</span>
                  </div>
                )}

                <div className="py-1">
                  {currencyOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setCurrency(option.value)}
                      className={`w-full px-4 py-2.5 text-left text-[15px] relative group transition-all duration-200 ${
                        currency === option.value
                          ? "text-[#027e3f] bg-[#027e3f]/5 font-medium"
                          : "hover:bg-[#027e3f]/5 hover:text-[#027e3f]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center font-medium">
                          {option.symbol}
                        </span>
                        <span>{option.label}</span>
                      </div>
                      {currency === option.value && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#027e3f] rounded-r-full"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#027e3f]/0 via-[#027e3f]/5 to-[#027e3f]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sell link (only when logged in) */}
          {isAuthenticated && (
            <Link
              href="/seller/dashboard"
              className="group px-3 py-2 text-[15px] font-medium flex items-center gap-2 hover:text-[#027e3f] transition-colors"
            >
              <DollarSign className="w-5 h-5 text-current" />
              <span>Sell</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none hover:text-[#027e3f] transition-colors p-1 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Profile / Sign In (Desktop only) */}
        <div
          className="hidden lg:flex items-center relative"
          ref={profileRef}
          onMouseEnter={() => handleMouseEnter(setProfileOpen, profileTimer)}
          onMouseLeave={() => handleMouseLeave(setProfileOpen, profileTimer)}
        >
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2 cursor-pointer">
                {user?.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full h-10 w-10 object-cover border-2 border-[#027e3f]"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-[#2C5A3F] flex items-center justify-center text-white text-lg font-medium">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-gray-800 font-medium hidden lg:inline">
                  {user?.name}
                </span>
              </div>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {userRole || "User"}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/notifications"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Notifications
                  </Link>
                  <Link
                    href="/chats"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Chats
                  </Link>
                  <Link
                    href="/security-settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Security Settings
                  </Link>
                  <Link
                    href="/payment-methods"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Payment Methods
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2.5 text-[15px] bg-[#027e3f] text-white font-medium rounded-lg hover:bg-[#026e37] transition-colors shadow-sm"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div
            ref={menuRef}
            className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-100"
          >
            <div className="p-4 space-y-3">
              <Link
                href="/marketplace"
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="w-5 h-5 text-[#027e3f]" />
                <span className="font-medium">Marketplace</span>
              </Link>

              <div className="border-t border-gray-100 pt-3">
                <button
                  onClick={() => {
                    setCompanyOpen(!companyOpen);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-[#027e3f]" />
                    <span className="font-medium">Company</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-200 ${
                      companyOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {companyOpen && (
                  <div className="pl-11 mt-1 space-y-1">
                    {[
                      { href: "/aboutus", label: "About Us" },
                      { href: "/contact", label: "Contact Us" },
                    ].map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="block py-2 text-gray-600 hover:text-[#027e3f]"
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {isAuthenticated && (
                <div className="border-t border-gray-100 pt-3">
                  <button
                    onClick={() => {
                      setDashboardOpen(!dashboardOpen);
                    }}
                    className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-800"
                  >
                    <div className="flex items-center space-x-3">
                      <LayoutDashboard className="w-5 h-5 text-[#027e3f]" />
                      <span className="font-medium">Dashboard</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-200 ${
                        dashboardOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {dashboardOpen && (
                    <div className="pl-11 mt-1 space-y-1">
                      {dashboardOptions.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          className="block py-2 text-gray-600 hover:text-[#027e3f]"
                          onClick={() => setIsOpen(false)}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="border-t border-gray-100 pt-3">
                <button
                  onClick={() => {
                    setCurrencyOpen(!currencyOpen);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    <Coins className="w-5 h-5 text-[#027e3f]" />
                    <span className="font-medium">Currency</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-200 ${
                      currencyOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {currencyOpen && (
                  <div className="pl-11 mt-1 space-y-1">
                    {currencyOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setCurrency(
                            option.value as "USD" | "INR" | "EUR" | "GBP"
                          );
                          setIsOpen(false);
                        }}
                        className={`py-2 text-gray-600 hover:text-[#027e3f] flex items-center space-x-2 ${
                          currency === option.value
                            ? "font-medium text-[#027e3f]"
                            : ""
                        }`}
                      >
                        <span className="font-medium">{option.symbol}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isAuthenticated && (
                <Link
                  href="/seller/dashboard"
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-800 border-t border-gray-100 mt-3 pt-3"
                  onClick={() => setIsOpen(false)}
                >
                  <DollarSign className="w-5 h-5 text-[#027e3f]" />
                  <span className="font-medium">Sell</span>
                </Link>
              )}

              {!isAuthenticated && (
                <div className="border-t border-gray-100 mt-3 pt-3">
                  <Link
                    href="/login"
                    className="flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#027e3f] text-white font-medium hover:bg-[#026e37]"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                  </Link>
                </div>
              )}

              {isAuthenticated && (
                <div className="border-t border-gray-100 mt-3 pt-3">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-red-600 w-full"
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
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Logout confirmation dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Log out?"
        message="Are you sure you want to log out of your account?"
        confirmLabel="Log out"
        cancelLabel="Stay signed in"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </nav>
  );
}
