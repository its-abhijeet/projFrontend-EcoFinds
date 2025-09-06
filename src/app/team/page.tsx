"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Linkedin, ChevronRight } from "lucide-react";

interface Director {
  name: string;
  title: string;
  image: string;
  email: string;
  linkedin: string;
  description: string;
}

const directors: Director[] = [
  {
    name: "Abhijeet Nigam",
    title: "Founder",
    image: "/directors/director3.jpeg",
    email: "mailme.a.nigam@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhijeet-nigam-605967223/",
    description:
      "Final Year Undergraduate student at IIT Kharagpur. Figuring out the development domain while building and learning new things on the way.",
  },
  {
    name: "Ujjwal Kumar Singh",
    title: "Founder",
    image: "/directors/director2.jpg",
    email: "ujjwalkumar0149@gmail.com",
    linkedin: "https://www.linkedin.com/in/ujjwalkumarsingh/",
    description:
      "With 3+ years in IT, Ujjwal specializes in cloud engineering, scalable architectures, and DevOps-driven digital transformation.",
  },
  {
    name: "Parth Gupta",
    title: "Founder",
    image: "/directors/director1.jpg",
    email: "parthgupta2510@gmail.com",
    linkedin: "https://www.linkedin.com/in/parthgupta2510/",
    description:
      "Parth has worked with Larsen & Toubro and invested in over 30 SMEs across eastern India, bringing his rich experience in managment and finance consulting",
  },
  {
    name: "Ankit Yadav",
    title: "Founder",
    image: "/directors/director1.jpg",
    email: "prodyut@dhruvacapital.com",
    linkedin: "https://www.linkedin.com/in/ankit-yadav-4a923b248/",
    description:
      "A Final Year electrical engineering student at IIT Kharagpur, India. I have a keen interest in the field of software development and also excited about the transformative power of AI and ML in solving complex problems. Currently enhancing skills through online courses and personal projects. Seeking connections with mentors, professionals, and peers to learn, collaborate, and contribute to tech innovations",
  },
];

export default function Team() {
  return (
    <div className="min-h-screen w-full bg-white -mt-2 pt-0">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#1B442E] overflow-hidden"
      >
        {/* Background pattern - created with CSS */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.15) 2%, transparent 0%)",
              backgroundSize: "100px 100px",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B442E] via-[#2C5A3F] to-[#1B442E] opacity-90"></div>
        </div>

        <div className="relative w-full max-w-[90%] md:max-w-4xl mx-auto text-center px-4 py-16 md:py-24 lg:py-32 z-10">
          <div className="inline-flex items-center px-3 py-1 bg-green-700/50 rounded-full mb-4 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
            <span className="text-xs font-medium text-green-100">
              Our Leadership
            </span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight font-lora text-white">
            Meet Our <span className="text-green-300">Leadership Team</span>
          </h1>

          <div className="w-24 h-0.5 bg-green-400/50 mx-auto mb-6"></div>

          <p className="text-sm xs:text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2 text-gray-200">
            Bringing together decades of expertise in finance, technology, and
            sustainability to drive innovation and create lasting impact.
          </p>
        </div>
      </motion.section>

      {/* Directors Grid */}
      <div className="w-full max-w-[95%] lg:max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
        <div className="absolute top-20 right-0 w-64 h-64 bg-[#027e3f]/5 rounded-full opacity-50 blur-3xl -z-10"></div>
        <div className="absolute bottom-40 left-0 w-80 h-80 bg-[#027e3f]/5 rounded-full opacity-50 blur-3xl -z-10"></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-5 font-lora">
            Our Founders
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3">
            <div className="h-0.5 w-10 bg-[#027e3f]/30"></div>
            <div className="h-0.5 w-16 bg-[#027e3f]"></div>
            <div className="h-0.5 w-10 bg-[#027e3f]/30"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of accomplished professionals leading the way with vision
            and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {directors.map((director, idx) => (
            <motion.div
              key={director.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ y: -5 }}
              className="relative group flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={director.image}
                  alt={director.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 font-lora">
                    {director.name}
                  </h3>
                  <p className="text-sm text-white/90 font-medium uppercase tracking-wider">
                    {director.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-col flex-grow p-6 bg-white">
                <div className="flex items-center mb-4">
                  <div className="h-px w-12 bg-[#027e3f]"></div>
                  <div className="h-px flex-grow bg-gray-200"></div>
                </div>
                <div className="flex-grow mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {director.description}
                  </p>
                </div>

                <div className="flex gap-3 mt-4">
                  <a
                    href={`mailto:${director.email}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#027e3f] text-[#027e3f] font-medium transition duration-300 hover:bg-[#027e3f] hover:text-white"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Email</span>
                  </a>

                  <a
                    href={director.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#0A66C2] text-[#0A66C2] font-medium transition duration-300 hover:bg-[#0A66C2] hover:text-white"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full bg-gray-50 py-16 md:py-24 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#027e3f]/30 to-transparent"></div>
        <div className="absolute right-0 top-20 w-64 h-64 rounded-full bg-[#027e3f]/10 blur-3xl -z-0"></div>

        <div className="w-full max-w-[90%] lg:max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <span className="inline-block text-[#027e3f] font-medium mb-2 tracking-wider text-sm uppercase px-4 py-1 bg-[#027e3f]/10 rounded-full">
              Our Values
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 text-gray-900 font-lora">
              Leadership Principles
            </h2>
            <div className="flex items-center justify-center gap-1 mb-3">
              <div className="h-0.5 w-10 bg-[#027e3f]/30"></div>
              <div className="h-0.5 w-16 bg-[#027e3f]"></div>
              <div className="h-0.5 w-10 bg-[#027e3f]/30"></div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Guided by strong values and a commitment to excellence, we strive
              to create positive change through sustainable practices and
              innovative solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Vision & Innovation",
                desc: "Pioneering forward-thinking strategies that drive sustainable growth and create lasting value for our stakeholders.",
                icon: "01",
              },
              {
                title: "Integrity & Transparency",
                desc: "Upholding the highest ethical standards with clear communication and accountable business practices.",
                icon: "02",
              },
              {
                title: "Impact & Sustainability",
                desc: "Committed to creating positive environmental and economic impact through sustainable solutions.",
                icon: "03",
              },
            ].map((principle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 group"
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.1) 0px 13px 27px -5px, rgba(0, 0, 0, 0.2) 0px 8px 16px -8px",
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#027e3f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                <div className="bg-[#027e3f]/5 p-4 flex justify-between items-center">
                  <span className="text-[#027e3f] text-xl font-bold tracking-wider">
                    {principle.icon}
                  </span>
                  <ChevronRight className="text-[#027e3f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 font-lora">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
