"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import {
  FaBoxes,
  FaSearch,
  // FaFacebookF,
  // FaEnvelope,
  FaChartLine,
  FaGlobe,
  FaHandshake,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import styles from "./NatureHero.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Chatbot from "@/components/MessageBot";
import "./tablet-fixes.css";
import { BACKEND_API_URL } from "@/constants/apiConstants";
// import ChatBot from '@/components/MessageBot';

// const slides = [
//   '/home1.jpg',
//   '/home2.jpg',
//   '/home3.jpg',
//   '/home4.jpg',
//   '/home5.jpg',
//   '/home6.jpg',
//   '/home7.jpg',
// ]

export interface ImageObject {
  id: number;
  url: string;
}

export interface Product {
  product_id: number; // ← maps from `id`
  seller_id: string; // ← maps from `sellerUserId`
  product_name: string; // ← maps from `name`
  product_price: number; // ← maps from `price`
  product_currency: string; // ← maps from `currency`
  product_qty: number; // ← maps from `quantity`
  product_unit: string; // ← maps from `unit`
  product_category: string; // ← maps from `category`
  product_country: string; // corresponds to `country`
  product_color: string; // corresponds to `color`
  product_source_material: string; // corresponds to `sourceMaterial`
  product_batch_size: number; // corresponds to `batchSize`
  product_minimum_order_quantity: number; // corresponds to `minimumOrderQuantity`
  product_application: string; // corresponds to `application`
  product_desc: string; // ← maps from `description`
  product_additional_notes: string | null; // ← maps from `additionalNotes`
  product_images: ImageObject[]; // ← maps from `images`
  is_approved: number; // ← maps from `isApproved`
}

const NatureHero = () => {
  const { isAuthenticated } = useAuth();

  // Modified useMediaQuery hook with SSR handling
  const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      setHasMounted(true);
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = () => setMatches(media.matches);
      media.addListener(listener);
      return () => media.removeListener(listener);
    }, [query]);

    // Return false on server-side
    if (!hasMounted) return false;
    return matches;
  };

  const { convertPrice } = useCurrency();
  const hasRevealed = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [changingPosition, setChangingPosition] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  // Images to display inside the phone in the How It Works section
  const phoneImages = [
    "/figma/1.png",
    "/figma/2.png",
    "/figma/3.png",
    "/figma/4.png",
    "/figma/5.png",
    "/figma/6.png",
  ];

  // Index of the currently displayed phone image
  const [phoneImageIndex, setPhoneImageIndex] = useState(0);

  // Automatically cycle through phone images with a natural swipe effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPhoneImageIndex((prev) => (prev + 1) % phoneImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [phoneImages.length]);

  // Use the media query to check if the device is mobile
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");

  // const products = [
  //   {
  //     id: 1,
  //     name: "PIR rPP Plastic",
  //     quantity: 25,
  //     country: "USA",
  //     price: 200,
  //     image: {
  //       src: "/product1.jpg",
  //       width: 450,
  //       height: 300,
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "PCR rPP Plastic",
  //     quantity: 40,
  //     country: "Germany",
  //     price: 300,
  //     image: {
  //       src: "/product2.jpg",
  //       width: 450,
  //       height: 300,
  //     },
  //   },
  //   {
  //     id: 3,
  //     name: "PIR rPP Plastic",
  //     quantity: 15,
  //     country: "Russia",
  //     price: 150,
  //     image: {
  //       src: "/product3.jpg",
  //       width: 450,
  //       height: 300,
  //     },
  //   },
  //   {
  //     id: 4,
  //     name: "PIR rPP Plastic",
  //     quantity: 60,
  //     country: "Spain",
  //     price: 250,
  //     image: {
  //       src: "/product4.jpg",
  //       width: 450,
  //       height: 300,
  //     },
  //   },
  //   {
  //     id: 5,
  //     name: "PET Plastic",
  //     quantity: 35,
  //     country: "UK",
  //     price: 280,
  //     image: {
  //       src: "/product-n.jpg",
  //       width: 450,
  //       height: 300,
  //     },
  //   },
  //   {
  //     id: 6,
  //     name: "HDPE Plastic",
  //     quantity: 45,
  //     country: "France",
  //     price: 320,
  //     image: {
  //       src: "/product-n2.jpg",
  //       width: 450,
  //       height: 300,
  //     },
  //   },
  //   {
  //     id: 7,
  //     name: "PVC Plastic",
  //     quantity: 30,
  //     country: "Italy",
  //     price: 270,
  //     image: {
  //       src: "/product-n3.jpeg",
  //       width: 450,
  //       height: 300,
  //     },
  //   },
  //   {
  //     id: 8,
  //     name: "LDPE Plastic",
  //     quantity: 55,
  //     country: "Portugal",
  //     price: 290,
  //     image: {
  //       src: "/product-n4.jpeg",
  //       width: 450,
  //       height: 300,
  //     },
  //   },
  // ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = `${BACKEND_API_URL}/products/`;
        const res = await fetch(url);
        if (!res.ok) {
          console.error("Failed to fetch products:", res.statusText);
          return;
        }

        // Raw response from your backend (array of objects like { id, sellerUserId, name, ... , images: [...] })
        const rawData = await res.json();

        // Map each raw item → our frontend `Product` shape
        const mapped: Product[] = rawData.map((raw) => ({
          product_id: raw.id,
          seller_id: raw.sellerUserId,
          product_name: raw.name,
          product_price: raw.price,
          product_currency: raw.currency,
          product_qty: raw.quantity,
          product_unit: raw.unit,
          product_category: raw.category,
          product_country: raw.country,
          product_color: raw.color,
          product_source_material: raw.sourceMaterial,
          product_batch_size: raw.batchSize,
          product_minimum_order_quantity: raw.minimumOrderQuantity,
          product_application: raw.application,
          product_desc: raw.description,
          product_additional_notes: raw.additionalNotes ?? null,
          // Backend `images` is presumably an array like: [{ id, url, productId, createdAt }, …]
          product_images: Array.isArray(raw.images)
            ? raw.images.map((img) => ({
                id: img.id,
                url: img.url,
              }))
            : [],
          is_approved: raw.isApproved,
        }));

        setProducts(mapped);
        console.log("Fetched products:", mapped);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  const [tab, setTab] = useState<"sellers" | "buyers">("sellers");
  const sections = {
    sellers: [
      {
        Icon: FaBoxes,
        title: "List Inventory",
        text: "Showcase recycled plastic grades in under a minute.",
      },
      {
        Icon: FaChartLine,
        title: "Maximise Earnings",
        text: "Connect with buyers instantly to secure top market rates.",
      },
      {
        Icon: FaGlobe,
        title: "Global Reach",
        text: "Ship directly to clients around the world.",
      },
    ],
    buyers: [
      {
        Icon: FaSearch,
        title: "Explore Materials",
        text: "Browse recycled plastic grades effortlessly.",
      },
      {
        Icon: FaHandshake,
        title: "Negotiate Instantly",
        text: "Connect with sellers for the best deals.",
      },
      {
        Icon: FaShoppingCart,
        title: "Secure Orders",
        text: "Place orders with confidence and transparency.",
      },
    ],
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => {
      if (isMobile) {
        return prev >= products.length - 1 ? 0 : prev + 1;
      }
      // For desktop, keep existing behavior
      return prev >= products.length - 3 ? 0 : prev + 1;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => {
      if (isMobile) {
        return prev <= 0 ? products.length - 1 : prev - 1;
      }
      // For desktop, keep existing behavior
      return prev <= 0 ? products.length - 3 : prev - 1;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Reset activeIndex when screen size changes
  useEffect(() => {
    setActiveIndex(0);
  }, [isMobile]);

  useEffect(() => {
    // Import ScrollReveal dynamically since it's a client-side library
    if (hasRevealed.current) return;
    hasRevealed.current = true;
    import("scrollreveal").then((ScrollRevealModule) => {
      const ScrollReveal = ScrollRevealModule.default;

      const scrollRevealOption = {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
      };

      // Apply animations to elements
      ScrollReveal().reveal(`.${styles.hero_h1}`, {
        ...scrollRevealOption,
      });

      ScrollReveal().reveal(`.${styles.hero_h2}`, {
        ...scrollRevealOption,
        delay: 500,
      });

      ScrollReveal().reveal(`.${styles.hero_p}`, {
        ...scrollRevealOption,
        delay: 1000,
      });

      ScrollReveal().reveal(`.${styles.socials}`, {
        ...scrollRevealOption,
        delay: 1500,
      });
    });
  }, []);

  // Add enhanced animation keyframes for smoother transitions
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      !document.getElementById("fadeAnimations")
    ) {
      const style = document.createElement("style");
      style.id = "fadeAnimations";
      style.innerHTML = `
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(1.1); filter: blur(8px); }
          30% { opacity: 0.6; transform: scale(1.05); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Implement sequential image sliding effect with improved timing
  useEffect(() => {
    if (isMobile) {
      let position = 0;
      const slideDelay = 3500; // Longer delay between changes for better viewing
      const animationTime = 1500; // Match the longer CSS transition duration

      const interval = setInterval(() => {
        // Update the changing position
        setChangingPosition(position);

        // Schedule the next position change
        setTimeout(() => {
          // Increment current image index
          setCurrentImageIndex((prev) => prev + 1);

          // Move to next position
          position = (position + 1) % 4;
        }, animationTime);
      }, slideDelay);

      return () => clearInterval(interval);
    }
  }, [isMobile]);

  useEffect(() => {
    // Add animation keyframes to document if they don't exist
    if (
      typeof document !== "undefined" &&
      !document.getElementById("slideAnimations")
    ) {
      const style = document.createElement("style");
      style.id = "slideAnimations";
      style.innerHTML = `
        @keyframes slideOut {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slideIn {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slideOut {
          animation: slideOut 1s forwards;
        }
        .animate-slideIn {
          animation: slideIn 1s forwards;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Add CSS styles for tablet layout
  useEffect(() => {
    // Comprehensive fix for iPad view to ensure all sections are visible and content is centered
    if (
      typeof document !== "undefined" &&
      !document.getElementById("tabletStyles")
    ) {
      const style = document.createElement("style");
      style.id = "tabletStyles";
      style.innerHTML = `
        @media (min-width: 769px) and (max-width: 1024px) {
          html, body {
            height: auto !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
          }
          
          main, #__next, [data-reactroot] {
            height: auto !important;
            overflow: visible !important;
          }
          
          .${styles.container} {
            height: auto !important;
            min-height: auto !important;
            overflow: visible !important;
            position: relative !important;
            padding-top: 20px !important;
            margin-top: 0 !important;
            display: block !important;
          }
          
          .${styles.container_grid} {
            position: static !important;
            height: auto !important;
            display: block !important;
          }
          
          .${styles.container_content} {
            position: static !important;
            transform: none !important;
            margin: 0 auto !important;
            padding: 0 !important;
            width: 90% !important;
            max-width: 600px !important;
            text-align: center !important;
          }
          
          .${styles.hero_h1}, 
          .${styles.hero_h2},
          .${styles.hero_p} {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 90% !important;
          }
          
          .${styles.socials} {
            justify-content: center !important;
            margin: 1.5rem auto 3rem !important;
          }
          
          section {
            display: block !important;
            height: auto !important;
            overflow: visible !important;
            position: static !important;
            margin-top: 0 !important;
          }
          
          /* Target the How It Works and New Offers sections specifically */
          section.py-20, section.py-16 {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: static !important;
            z-index: 10 !important;
            margin-top: 0 !important;
          }
          
          /* Specific style for the tablet mode container */
          .tablet-mode {
            min-height: 100vh;
            overflow-y: auto;
          }
          
          /* Ensure the content is properly centered on tablets */
          .tablet-mode .${styles.container_content} {
            margin: 20px auto 40px !important;
            padding: 0 20px !important;
            max-width: 600px !important;
            text-align: center !important;
          }
          
          /* Fix for the  text in tablet view */
          .tablet-mode .${styles.typing_wrapper},
          .tablet-mode .${styles.typing_text} {
            width: auto !important;
            min-width: 250px !important;
            display: inline-block !important;
            white-space: nowrap !important;
            overflow: visible !important;
            margin-right: 0 !important;
          }
          
          .tablet-mode .${styles.hero_h1} {
            width: 100% !important;
            max-width: 100% !important;
            white-space: nowrap !important;
            overflow: visible !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          
          .tablet-mode .${styles.static_text} {
            display: block !important;
            width: 100% !important;
            text-align: center !important;
            margin-bottom: 5px !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, [
    styles.container,
    styles.container_content,
    styles.hero_h1,
    styles.hero_h2,
    styles.hero_p,
    styles.socials,
    styles.container_grid,
  ]);

  return (
    <div className="m-0 p-0">
      <div className={`m-0 p-0 ${isTablet ? "tablet-mode" : ""}`}>
        {/* <ChatBot /> */}
        <Chatbot />
        <section
          className={`${styles.container} ${
            isTablet ? "tablet-layout pt-4" : "-mt-2 pt-4"
          }`}
        >
          <div className={styles.container_grid}>
            {isTablet ? null : (
              <>
                <Image
                  src="/bg-dots.png"
                  alt="bg"
                  className={styles.bg_1}
                  width={150}
                  height={150}
                />
                <Image
                  src="/bg-dots.png"
                  alt="bg"
                  className={styles.bg_2}
                  width={150}
                  height={150}
                />
                <Image
                  src="/bg-dots.png"
                  alt="bg"
                  className={styles.bg_3}
                  width={150}
                  height={150}
                />
                {/* Overlapping collage layout - visible on large screens only, hidden on tablets */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0 hidden lg:block">
                  <div className={styles.collage_wrapper}>
                    {/* Center large image */}
                    <div
                      className={`${styles.collage_item} ${styles.center_large}`}
                    >
                      <div className={styles.image_switcher}>
                        <Image
                          src="/product1.jpg"
                          alt="Center"
                          width={400}
                          height={400}
                        />
                        <Image
                          src="/home2.jpg"
                          alt="Center Alt"
                          width={400}
                          height={400}
                        />
                      </div>
                    </div>

                    {/* Top row */}
                    <div
                      className={`${styles.collage_item} ${styles.top_left}`}
                    >
                      <div className={styles.image_switcher}>
                        <Image
                          src="/product2.jpg"
                          alt="Top Left"
                          width={300}
                          height={300}
                        />
                        <Image
                          src="/product3.jpg"
                          alt="Top Left Alt"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>
                    <div
                      className={`${styles.collage_item} ${styles.top_right}`}
                    >
                      <div className={styles.image_switcher}>
                        <Image
                          src="/product4.jpg"
                          alt="Top Right"
                          width={300}
                          height={300}
                        />
                        <Image
                          src="/home3.jpg"
                          alt="Top Right Alt"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>

                    {/* Left side */}
                    <div
                      className={`${styles.collage_item} ${styles.middle_left}`}
                    >
                      <div className={styles.image_switcher}>
                        <Image
                          src="/home4.jpg"
                          alt="Middle Left"
                          width={300}
                          height={300}
                        />
                        <Image
                          src="/product1.jpg"
                          alt="Middle Left Alt"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>

                    {/* Right side */}
                    <div
                      className={`${styles.collage_item} ${styles.middle_right}`}
                    >
                      <div className={styles.image_switcher}>
                        <Image
                          src="/product2.jpg"
                          alt="Middle Right"
                          width={300}
                          height={300}
                        />
                        <Image
                          src="/product3.jpg"
                          alt="Middle Right Alt"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div
                      className={`${styles.collage_item} ${styles.bottom_left}`}
                    >
                      <div className={styles.image_switcher}>
                        <Image
                          src="/product4.jpg"
                          alt="Bottom Left"
                          width={300}
                          height={300}
                        />
                        <Image
                          src="/home2.jpg"
                          alt="Bottom Left Alt"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>
                    <div
                      className={`${styles.collage_item} ${styles.bottom_middle}`}
                    >
                      <div className={styles.image_switcher}>
                        <Image
                          src="/home3.jpg"
                          alt="Bottom Middle"
                          width={300}
                          height={300}
                        />
                        <Image
                          src="/home4.jpg"
                          alt="Bottom Middle Alt"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>
                    <div
                      className={`${styles.collage_item} ${styles.bottom_right}`}
                    >
                      <div className={styles.image_switcher}>
                        <Image
                          src="/product1.jpg"
                          alt="Bottom Right"
                          width={300}
                          height={300}
                        />
                        <Image
                          src="/product2.jpg"
                          alt="Bottom Right Alt"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className={`-mt-2 pt-0 ${isTablet ? "-mt-4" : ""}`}>
              <div
                className={`${styles.container_content} ${
                  isMobile ? "-mt-5 pt-0" : ""
                }`}
              >
                <h1
                  className={`${styles.hero_h1} ${isTablet ? "hero-h1" : ""}`}
                >
                  <span
                    className={`${styles.static_text} ${
                      isTablet ? "static-text" : ""
                    }`}
                  >
                    We are
                  </span>
                  <div
                    className={`${styles.typing_wrapper} ${
                      isTablet ? "typing-wrapper" : ""
                    }`}
                  >
                    <span
                      className={`${styles.typing_text} ${
                        isTablet ? "typing-text" : ""
                      }`}
                    >
                      Eco-Find
                    </span>
                  </div>
                </h1>
                <h2 className={styles.hero_h2}>
                  Recycle Waste Into a Better Tomorrow
                </h2>
                <p className={styles.hero_p}>
                  Join our revolutionary marketplace where waste transforms into
                  opportunity. Connect with global partners, trade sustainably,
                  and be part of the circular economy revolution.
                </p>
                <div className={styles.socials}>
                  {!isMobile ? (
                    // Desktop layout
                    <div>
                      <div className="flex items-center space-x-6">
                        <Link
                          href="/"
                          aria-label="LinkedIn"
                          target="_blank"
                          className="w-11 h-11 flex items-center justify-center bg-white text-gray-800 hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm rounded-full overflow-hidden group"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="22"
                            height="22"
                            className="fill-current text-gray-700 group-hover:text-white transition-colors duration-300"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </Link>
                        <Link
                          href="tel: +91 9876543210"
                          aria-label="WhatsApp"
                          className="w-11 h-11 flex items-center justify-center bg-white text-gray-800 hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-sm rounded-full overflow-hidden group"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="22"
                            height="22"
                            className="fill-current text-gray-700 group-hover:text-white transition-colors duration-300"
                          >
                            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                          </svg>
                        </Link>

                        {!isAuthenticated && (
                          <Link
                            href="/register"
                            className="group ml-6 px-6 py-3 bg-gradient-to-r from-[#FFBF00] to-[#E3A700] text-gray-800 text-sm md:text-base font-semibold rounded-full hover:from-[#FFD700] hover:to-[#E3A700] transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center border border-[#FFD700]/30 transform hover:-translate-y-1 relative overflow-hidden"
                          >
                            <span className="relative z-10 font-medium tracking-wide">
                              Get Started
                            </span>
                            <svg
                              className="w-4 h-4 ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              ></path>
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-white/30 to-[#FFD700]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 rounded-full"></div>
                          </Link>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Mobile layout - completely restructured for better alignment
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center gap-6">
                        <Link
                          href="/"
                          aria-label="LinkedIn"
                          target="_blank"
                          className="w-[44px] h-[44px] flex items-center justify-center bg-white text-gray-800 hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm rounded-full overflow-hidden group"
                          style={{ width: "44px", height: "44px" }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="fill-current text-gray-700 group-hover:text-white transition-colors duration-300"
                            style={{ width: "24px", height: "24px" }}
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </Link>
                        <Link
                          href="tel: +91 9876543210"
                          aria-label="WhatsApp"
                          className="w-[44px] h-[44px] flex items-center justify-center bg-white text-gray-800 hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-sm rounded-full overflow-hidden group"
                          style={{ width: "44px", height: "44px" }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="fill-current text-gray-700 group-hover:text-white transition-colors duration-300"
                            style={{ width: "24px", height: "24px" }}
                          >
                            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                          </svg>
                        </Link>
                      </div>

                      {!isAuthenticated && (
                        <div className="mt-4">
                          <a
                            href="/register"
                            className="inline-block px-6 py-2.5 bg-[#FFBF00] text-[#fff] rounded-lg shadow-md border border-[#FFD700]/30 text-center font-semibold"
                            style={{
                              width: "140px",
                              whiteSpace: "nowrap",
                              backgroundColor: "#FFBF00",
                            }}
                          >
                            Get Started →
                          </a>
                        </div>
                      )}

                      {/* Image Carousel - no captions, continuous rotation */}
                      <div className="w-full px-4 py-8">
                        <div className="max-w-md mx-auto">
                          {/* 2x2 Image Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              {
                                images: [
                                  "/product1.jpg",
                                  "/home2.jpg",
                                  "/product3.jpg",
                                  "/home4.jpg",
                                ],
                                alt: "Recycled Materials",
                                title: "Materials",
                              },
                              {
                                images: [
                                  "/product2.jpg",
                                  "/product4.jpg",
                                  "/home3.jpg",
                                  "/product1.jpg",
                                ],
                                alt: "Processing Plant",
                                title: "Processing",
                              },
                              {
                                images: [
                                  "/product3.jpg",
                                  "/product1.jpg",
                                  "/home2.jpg",
                                  "/product4.jpg",
                                ],
                                alt: "Quality Control",
                                title: "Quality",
                              },
                              {
                                images: [
                                  "/product4.jpg",
                                  "/home3.jpg",
                                  "/product1.jpg",
                                  "/product2.jpg",
                                ],
                                alt: "Distribution",
                                title: "Global",
                              },
                            ].map((item, index) => (
                              <div
                                key={index}
                                className="relative group aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
                              >
                                {/* Main Image */}
                                <div className="absolute inset-0 bg-gray-100">
                                  <Image
                                    src={
                                      item.images[
                                        Math.floor(currentImageIndex / 4) % 4
                                      ]
                                    }
                                    alt={item.alt}
                                    fill
                                    className={`object-cover transition-all duration-700 ${
                                      changingPosition === index
                                        ? "opacity-0 scale-110 blur-sm"
                                        : "opacity-100 scale-100 blur-0"
                                    }`}
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                  />
                                </div>

                                {/* Next Image Layer */}
                                {changingPosition === index && (
                                  <div className="absolute inset-0">
                                    <Image
                                      src={
                                        item.images[
                                          (Math.floor(currentImageIndex / 4) +
                                            1) %
                                            4
                                        ]
                                      }
                                      alt={item.alt}
                                      fill
                                      className="object-cover animate-fadeIn"
                                      sizes="(max-width: 768px) 50vw, 33vw"
                                    />
                                  </div>
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Title */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                  <span className="text-white text-sm font-medium tracking-wide">
                                    {item.title}
                                  </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200/30">
                                  <div
                                    className="h-full bg-white/80 transition-all duration-500"
                                    style={{
                                      width: `${
                                        ((Math.floor(currentImageIndex / 4) %
                                          4) /
                                          3) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Navigation Dots - Centered below grid */}
                          <div className="flex justify-center items-center mt-6 space-x-2">
                            {[0, 1, 2, 3].map((dot) => (
                              <button
                                key={dot}
                                onClick={() => {
                                  setChangingPosition(dot);
                                  setCurrentImageIndex(
                                    Math.floor(currentImageIndex / 4) * 4 + dot
                                  );
                                }}
                                className={`transition-all duration-300 ${
                                  Math.floor(currentImageIndex / 4) % 4 === dot
                                    ? "w-6 h-1.5 bg-[#027e3f]"
                                    : "w-1.5 h-1.5 bg-gray-300"
                                } rounded-full hover:bg-[#027e3f]/50`}
                                aria-label={`View image set ${dot + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}

        <section className="py-20 px-6 bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(30deg,_#027e3f08_12%,_transparent_12.5%,_transparent_87%,_#027e3f08_87.5%,_#027e3f08_100%)] bg-[length:8px_8px]"></div>

          <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight relative">
                  How It Works
                  <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#027e3f] to-transparent"></div>
                </h2>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mt-8">
                Our streamlined process is designed to facilitate efficient
                trading of recyclable materials. Here&apos;s how you can
                participate:
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-16">
              <div className="bg-gray-50 p-1 rounded-lg shadow-sm">
                <button
                  onClick={() => setTab("sellers")}
                  className={`px-10 py-3 text-sm font-semibold transition-all duration-300 ${
                    tab === "sellers"
                      ? "bg-white text-[#027e3f] shadow-md"
                      : "text-gray-600 hover:text-[#027e3f]"
                  } rounded-md`}
                >
                  For Sellers
                </button>
                <button
                  onClick={() => setTab("buyers")}
                  className={`px-10 py-3 text-sm font-semibold transition-all duration-300 ${
                    tab === "buyers"
                      ? "bg-white text-[#027e3f] shadow-md"
                      : "text-gray-600 hover:text-[#027e3f]"
                  } rounded-md`}
                >
                  For Buyers
                </button>
              </div>
            </div>

            {/* Two-column flex container */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">
              {/* Left column: features */}
              <div className="w-full lg:w-1/2 flex flex-col space-y-8">
                {sections[tab].map(({ Icon, title, text }, index) => (
                  <div key={title} className="group">
                    <div className="p-8 bg-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-start space-x-6 border border-gray-100 relative">
                      {/* Numbered badge */}
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#027e3f] text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-lg">
                        {index + 1}
                      </div>
                      {/* icon */}
                      <div className="w-14 h-14 bg-gradient-to-br from-[#027e3f]/10 to-[#027e3f]/5 text-[#027e3f] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7" />
                      </div>

                      {/* text block */}
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">
                          {title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right column: iPhone image */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-[300px] h-[600px]">
                  {/* Elegant background effects */}
                  <div className="absolute -inset-12 bg-[radial-gradient(circle_at_center,rgba(2,126,63,0.03)_0%,transparent_70%)] pointer-events-none"></div>
                  <div className="absolute -inset-12 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0.05)_0%,rgba(2,126,63,0.02)_25%,rgba(255,255,255,0.05)_50%,rgba(2,126,63,0.02)_75%,rgba(255,255,255,0.05)_100%)] mix-blend-overlay pointer-events-none"></div>

                  {/* Phone frame with reflection */}
                  <div className="relative z-10 w-full h-full">
                    {/* Reflection effect */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(2,126,63,0.15)_0%,transparent_70%)] blur-lg transform scale-[0.9] opacity-75"></div>
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[60%] h-[30px] bg-[radial-gradient(ellipse_at_center,rgba(2,126,63,0.1)_0%,transparent_70%)] blur-md transform scale-[0.7] opacity-50"></div>

                    {/* Screen area (approximate insets to fit inside frame) */}
                    <div className="absolute top-[5.7%] bottom-[5.5%] left-[4.2%] right-[3.5%] rounded-[2rem] overflow-hidden z-10">
                      <div className="relative w-full h-full">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={phoneImageIndex}
                            className="absolute inset-0 w-full"
                            initial={{ x: "100%", filter: "blur(0px)" }}
                            animate={{
                              x: "0%",
                              filter: "blur(0px)",
                              transition: {
                                x: {
                                  type: "tween",
                                  duration: 0.6,
                                  ease: [0.32, 0.72, 0, 1],
                                },
                                filter: {
                                  duration: 0.3,
                                },
                              },
                            }}
                            exit={{
                              x: "-100%",
                              filter: "blur(12px)",
                              transition: {
                                x: {
                                  type: "tween",
                                  duration: 0.8,
                                  ease: [0.32, 0, 0.67, 0],
                                },
                                filter: {
                                  duration: 0.8,
                                  ease: [0.32, 0, 0.67, 0],
                                },
                              },
                            }}
                            style={{
                              willChange: "transform, filter",
                            }}
                          >
                            <Image
                              src={phoneImages[phoneImageIndex]}
                              alt={`Current slide ${phoneImageIndex + 1}`}
                              fill
                              sizes="(max-width: 630px) 150vw, 630px"
                              className="object-contain"
                              priority
                            />
                          </motion.div>

                          {/* Progress Indicators */}
                          {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-50">
                          {phoneImages.map((_, index) => (
                            <motion.div
                              key={index}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                index === phoneImageIndex 
                                  ? 'w-6 bg-white' 
                                  : 'w-1.5 bg-white/30'
                              }`}
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ 
                                scale: 1, 
                                opacity: 1,
                                transition: {
                                  delay: index * 0.1,
                                  duration: 0.3
                                }
                              }}
                            />
                          ))}
                        </div> */}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Realistic phone frame (on top) */}
                    <Image
                      src="/iphone.png"
                      alt="Phone frame"
                      fill
                      className="object-contain pointer-events-none select-none z-20"
                      priority
                    />
                  </div>

                  {/* Subtle decorative elements */}
                  <div className="absolute -inset-4 bg-[linear-gradient(120deg,rgba(2,126,63,0.02)_0%,transparent_50%,rgba(2,126,63,0.02)_100%)] pointer-events-none"></div>
                  <div className="absolute w-full h-full -rotate-12 scale-[2] opacity-30 bg-[radial-gradient(circle_at_70%_70%,rgba(2,126,63,0.05)_0%,transparent_50%)] pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW OFFERS */}

        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,_#027e3f08_12%,_transparent_12.5%,_transparent_87%,_#027e3f08_87.5%,_#027e3f08_100%)] bg-[length:8px_8px]"></div>

          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight relative">
                  New Offers
                  <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#027e3f] to-transparent"></div>
                </h2>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mt-8">
                Explore our latest recycled materials from verified suppliers
                worldwide
              </p>
            </div>

            <div className="relative">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-[#027e3f] hover:bg-[#027e3f] hover:text-white transition-all duration-300 group"
                disabled={isAnimating}
              >
                <FaChevronLeft className="w-5 h-5 transform transition-transform group-hover:scale-110" />
              </button>

              {/* Cards Container */}
              <div className="overflow-hidden">
                <motion.div
                  className="flex transition-all duration-500 ease-out"
                  style={{
                    transform: isMobile
                      ? `translateX(-${activeIndex * 102}%)`
                      : `translateX(-${activeIndex * (100 / 3)}%)`,
                    width: "auto",
                    display: "flex",
                    gap: "24px",
                    padding: "0 16px",
                  }}
                >
                  {products.map((product, index) => (
                    <motion.div
                      key={`${product.product_id}-${index}`}
                      style={{
                        width: isMobile
                          ? "calc(100vw - 48px)"
                          : "calc(33.333% - 16px)",
                        flexShrink: 0,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={`/marketplace/${product.product_id}`}
                        className="block bg-gradient-to-br from-[#fcfbf4] via-white to-[#fcfbf4] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#027e3f]/10 h-full transform hover:-translate-y-1"
                      >
                        <div className="relative w-full overflow-hidden group">
                          <Image
                            src={product.product_images[0]?.url}
                            alt={product.product_name}
                            width={450}
                            height={300}
                            className="h-48 md:h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#027e3f] via-[#027e3f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 right-4 bg-white/95 text-[#027e3f] px-4 py-2 rounded-xl text-sm font-semibold shadow-lg border-2 border-[#027e3f]/10 group-hover:border-[#027e3f]/30 transition-all duration-300">
                            {convertPrice(product.product_price)} / T
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="bg-[#027e3f] text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm border border-white/30">
                              {product.product_category}
                            </span>
                            <span className="bg-white/95 text-[#027e3f] px-4 py-2 rounded-xl text-sm font-medium border border-[#027e3f]/30">
                              {product.product_qty} {product.product_unit}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-semibold text-[#027e3f] truncate pr-4 border-l-4 border-[#027e3f] pl-3">
                              {product.product_name}
                            </h4>
                            <div className="flex items-center gap-2 bg-[#f0f7f2] px-3 py-1.5 rounded-xl border border-[#027e3f]/10">
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                              <span className="text-sm font-medium text-[#027e3f]">
                                Available
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-[#027e3f]/10">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-[#f0f7f2]">
                                <svg
                                  className="w-4 h-4 text-[#027e3f]"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  ></path>
                                </svg>
                              </div>
                              <span className="font-medium text-[#027e3f]">
                                Verified Supplier
                              </span>
                            </div>
                            <div className="flex items-center gap-2 bg-[#f0f7f2] px-3 py-1.5 rounded-xl">
                              <svg
                                className="w-4 h-4 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <span className="font-medium text-[#027e3f]">
                                4.8
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-[#027e3f] hover:bg-[#027e3f] hover:text-white transition-all duration-300 group"
                disabled={isAnimating}
              >
                <FaChevronRight className="w-5 h-5 transform transition-transform group-hover:scale-110" />
              </button>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/marketplace"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#027e3f] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#026e37] transform hover:-translate-y-1 overflow-hidden border border-white/10"
              >
                <span className="relative z-10 tracking-wide">
                  View All Offers
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-[#027e3f]/0 via-white/20 to-[#027e3f]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 rounded-full"></div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NatureHero;
