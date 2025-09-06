"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1B442E] text-white">
      <div className="max-w-7xl mx-auto px-9 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-13 gap-y-13">
          {/* Logo and Address Section */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block">
              <Image
                src="/Ecofind-white.png"
                alt="Green Cycle Hub Logo"
                width={175}
                height={175}
                priority
                className="object-contain mb-6 hover:opacity-90 transition-opacity"
              />
            </Link>
            <h4 className="mt-4 text-base font-semibold text-white">
              Address:
            </h4>
            <p className="text-base text-gray-300 leading-relaxed">
              Patel Hall of Residence, IIT Kharagpur
              <br />
              Kharagpur, West Bengal, India
            </p>
          </div>

          {/* Menu Links */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Menu Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Menu</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/marketplace"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/aboutus"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Help</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/contact"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Plastic Recycling
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Icons and Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </Link>
            <Link
              href="tel:+1234567890"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.8-3.9-8.7-8.7-8.7v2c3.7 0 6.7 3 6.7 6.7z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
            </Link>
          </div>
          <p className="text-sm text-gray-300">
            © 2025 Green Cycle Hub - Crafted with care to build a sustainable
            tomorrow ♻️
          </p>
        </div>
      </div>
    </footer>
  );
}
