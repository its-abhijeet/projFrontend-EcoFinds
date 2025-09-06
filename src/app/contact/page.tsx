// const FAQItem = ({
//   question,
//   answer,
// }: {
//   question: string;
//   answer: string;
// }) => {
//   const [open, setOpen] = useState(false);

// export default function ContactPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setForm({ name: "", email: "", subject: "", message: "" });
//   };s
"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
// import Image from 'next/image';

const faqs = [
  {
    question: "What products can I buy on EcoFind?",
    answer:
      "EcoFind offers second-hand home appliances, small electronic appliances, wooden and glass furniture, kitchen utensils, and reusable plastic ware.",
  },
  {
    question: "How can I sell my products on EcoFind?",
    answer:
      'Simply register as a seller through the "Seller" section, list your products, and start reaching conscious buyers looking for sustainable options.',
  },
  {
    question: "Where is EcoFind currently available?",
    answer:
      "We currently operate across India, with plans to expand to international markets soon.",
  },
  {
    question: "How can I reach EcoFind support?",
    answer:
      "You can use the contact form on this page or email us at support@ecofind.com. Our team usually responds within 24 hours.",
  },
];

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = useState(false);
  //   return (
  //     <div className="min-h-screen bg-white text-gray-800 -mt-2 pt-0">
  //       {/* Hero Banner */}
  //       <div className="relative bg-[#1B442E] overflow-hidden">
  //         <div className="absolute inset-0">
  //           <div
  //             className="absolute inset-0 opacity-30"
  //             style={{
  //               backgroundImage:
  //                 "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.15) 2%, transparent 0%)",
  //               backgroundSize: "100px 100px",
  //             }}
  //           ></div>
  //           <div className="absolute inset-0 bg-gradient-to-r from-[#1B442E] via-[#2C5A3F] to-[#1B442E] opacity-90"></div>
  //         </div>

  //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
  //           <div className="text-center">
  //             <div className="inline-flex items-center px-3 py-1 bg-green-700/50 rounded-full mb-4 border border-green-500/30">
  //               <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
  //               <span className="text-xs font-medium text-green-100">
  //                 Get In Touch
  //               </span>
  //             </div>

  //             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
  //               Let&apos;s <span className="text-green-300">Connect</span>
  //             </h1>

  //             <p className="text-sm sm:text-base text-gray-200 mb-6 max-w-xl mx-auto">
  //               Have questions about buying or selling pre-owned goods? Our
  //               EcoFind team is here to help you every step of the way.
  //             </p>
  //           </div>
  //         </div>
  //       </div>

  return (
    <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-lg text-[#1B442E] hover:bg-green-50 transition"
      >
        {question}
        {open ? (
          <ChevronUp className="w-5 h-5 text-green-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-green-600" />
        )}
      </button>
      <div
        className={`px-6 pb-4 text-gray-700 transition-all duration-300 ease-in-out ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <p className="leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 -mt-2 pt-0">
      {/* Hero Banner */}
      <div className="relative bg-[#1B442E] overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 bg-green-700/50 rounded-full mb-4 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
              <span className="text-xs font-medium text-green-100">
                Get In Touch
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Let&apos;s <span className="text-green-300">Connect</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-200 mb-6 max-w-xl mx-auto">
              Have questions or feedback? We&apos;re here to help. Reach out to
              our team for assistance with any inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#1B442E]/10 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-[#1B442E]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Our Office
            </h3>
            <p className="text-gray-600 leading-relaxed">
              PAN Loop Food Centre, IIT Kharagpur, West Bengal, India
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#1B442E]/10 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#1B442E]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Email Us
            </h3>
            <p className="text-gray-600 mb-1">info@green-cycle-hub.com</p>
            <p className="text-gray-600">support@green-cycle-hub.com</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#1B442E]/10 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-[#1B442E]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Call Us
            </h3>
            <p className="text-gray-600 mb-1">+91 98765 43210</p>
            <p className="text-gray-600 text-sm">
              Mon-Fri, 9:00 AM to 6:00 PM IST
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image/Map Section */}
            <div className="relative h-60 sm:h-80 md:h-full min-h-[300px] bg-[#1B442E]/90">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.15) 2%, transparent 0%)",
                  backgroundSize: "100px 100px",
                }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Get in Touch
                </h2>
                <p className="text-sm sm:text-base text-center text-white/80 mb-6 max-w-sm">
                  We&apos;d love to hear from you. Drop us a message and our
                  team will get back to you as soon as possible.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Response Time</p>
                    <p className="text-xs text-white/80">
                      Usually within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 sm:p-8 lg:p-10 bg-white" id="contact-form">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B442E] focus:border-transparent outline-none text-gray-700"
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B442E] focus:border-transparent outline-none text-gray-700"
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B442E] focus:border-transparent outline-none text-gray-700 bg-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Partnership">
                      Partnership Opportunities
                    </option>
                    <option value="Support">Technical Support</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B442E] focus:border-transparent outline-none text-gray-700"
                    required
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#1B442E] to-[#2C5A3F] text-white font-semibold py-3 px-6 rounded-lg hover:from-[#153420] hover:to-[#254A33] transition-all duration-300 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
                {submitted && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center mt-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <p className="text-sm">
                      Thank you! Your message has been sent successfully.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-3 py-1 bg-[#1B442E]/10 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-[#1B442E] mr-2"></div>
            <span className="text-xs font-medium text-[#1B442E]">FAQ</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our services, products, and
            processes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button
            onClick={() =>
              document
                .getElementById("contact-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B442E] text-white rounded-lg font-medium hover:bg-[#153420] transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Our Support Team</span>
          </button>
        </div>
      </div>
    </div>
  );
}
