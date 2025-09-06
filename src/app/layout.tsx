"use client"; // ← add this
import "./globals.css";
import { lora } from "../fonts/lora";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // ← works now
  const hideFooter =
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/seller/dashboard") ||
    pathname.startsWith("/buyer/dashboard") ||
    pathname.startsWith("/chats");

  // console.log("Current Pathname:", pathname);
  // console.log("Hide Footer:", hideFooter);

  return (
    <html lang="en" className={`${lora.variable}`}>
      <body className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
        <AuthProvider>
          <CurrencyProvider>
            <Navbar />
            <main className="mt-24">{children}</main>
            {!hideFooter && <Footer />}
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
