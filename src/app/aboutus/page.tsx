"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Globe2, Users } from "lucide-react";

export default function AboutUsSection() {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, Easing: [0.42, 0, 0.58, 1] },
    },
  };

  const imageReveal = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        Easing: [0.42, 0, 0.58, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white -mt-2 pt-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1B442E] to-[#2C5A3F] text-white">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h1
                className={`text-5xl lg:text-6xl font-bold leading-tight ${
                  isMobile ? "text-center" : ""
                }`}
              >
                Welcome to
                <span className="block text-[#e2d7ab] mt-2">
                  EcoFinds – A Sustainable Second Marketplace
                </span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed sm:text-left text-justify">
                At EcoFinds, our vision is to revolutionize the way people buy
                and sell pre-owned goods. We aim to foster a culture of
                sustainability by extending the lifecycle of products, reducing
                waste, and creating a trusted, convenient alternative to buying
                new. From home appliances to furniture and reusable essentials,
                EcoFinds is building a conscious community that values unique
                finds and responsible consumption.
              </p>
              <div
                className={`flex flex-wrap gap-6 ${
                  isMobile ? "justify-center w-full" : ""
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/marketplace"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#e2d7ab] text-[#1B442E] rounded-lg font-semibold hover:bg-[#d6c78f] transition-colors w-full sm:w-auto"
                  >
                    <span className="text-lg">Join Our Mission</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageReveal}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  fill
                  src="/AboutUs/aboutus2.jpg"
                  alt="EcoFinds Sustainable Marketplace"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1B442E] mb-4">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-[#e2d7ab] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe2 className="w-12 h-12 text-[#1B442E]" />,
                title: "Sustainability",
                description:
                  "Promoting a circular economy by giving products a longer life and reducing waste across communities.",
              },
              {
                icon: <Award className="w-12 h-12 text-[#1B442E]" />,
                title: "Trust & Quality",
                description:
                  "Ensuring transparency, reliability, and high standards in every transaction on our platform.",
              },
              {
                icon: <Users className="w-12 h-12 text-[#1B442E]" />,
                title: "Community",
                description:
                  "Building a conscious marketplace where people connect, share, and contribute to responsible consumption.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.2,
                    },
                  },
                }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="bg-[#e2d7ab]/20 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1B442E] mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed sm:text-left text-justify">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        ref={missionRef}
        className="py-24 bg-gradient-to-br from-[#1B442E]/5 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageReveal}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/ge.jpeg"
                  alt="Our Mission"
                  width={1920}
                  height={1080}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              className="space-y-8 order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold text-[#1B442E]">Our Mission</h2>
              <div className="w-24 h-1 bg-[#e2d7ab]" />
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed sm:text-left text-justify">
                EcoFinds is committed to reshaping the way people shop by making
                second-hand goods a mainstream choice. Our mission is to extend
                product lifecycles, reduce environmental waste, and make
                sustainable living simple and accessible for everyone.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed sm:text-left text-justify">
                By starting with categories like home appliances, small
                electronics, furniture, and reusable essentials, we provide an
                affordable, eco-friendly option that helps individuals and
                communities embrace a greener lifestyle.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section ref={visionRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold text-[#1B442E]">Our Vision</h2>
              <div className="w-24 h-1 bg-[#e2d7ab]" />
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed sm:text-left text-justify">
                We envision EcoFinds as the go-to destination for sustainable
                shopping—a vibrant, trusted marketplace where people discover
                unique finds while making eco-conscious choices.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed sm:text-left text-justify">
                By creating a thriving ecosystem of buyers and sellers, EcoFinds
                strives to drive responsible consumption, empower communities,
                and lead the movement towards a circular economy.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageReveal}
              className="relative"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[#1B442E] mix-blend-multiply opacity-20" />
                <Image
                  src="/we.jpeg"
                  alt="Our Vision"
                  width={1920}
                  height={1080}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-gradient-to-b from-[#2C5A3F] to-[#1B442E] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <div className="w-24 h-1 bg-[#e2d7ab] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Products Given a New Life" },
              { number: "500+", label: "Trusted Sellers" },
              { number: "50+", label: "Communities Connected" },
              { number: "75%", label: "Average Savings for Buyers" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-[#e2d7ab]/5 backdrop-blur-lg rounded-xl p-8 text-center border border-[#e2d7ab]/20 hover:bg-[#e2d7ab]/10 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="text-4xl font-bold text-[#e2d7ab] mb-2">
                  {stat.number}
                </div>
                <div className="text-base sm:text-lg text-white/90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
