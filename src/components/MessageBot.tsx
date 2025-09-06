"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { BACKEND_API_URL } from "@/constants/apiConstants";

interface Message {
  type: "bot" | "user";
  content: string;
}

interface Option {
  text: string;
  value: string;
}

interface UserDetails {
  companyName: string;
  userName: string;
  phoneNumber: string;
}

interface InputField {
  name: keyof UserDetails;
  label: string;
  type: string;
  required: boolean;
}

interface Question {
  id: string;
  text: string;
  type?: "input";
  options?: Option[];
  fields?: InputField[];
}

const questions: Question[] = [
  {
    id: "initial",
    text: "Would you like to trade in Recycled Plastic?",
    options: [
      { text: "Yes, I want to trade", value: "yes" },
      { text: "Just exploring", value: "explore" },
      { text: "No, thanks", value: "no" },
    ],
  },
  {
    id: "userDetails",
    text: "Please enter your details",
    type: "input",
    fields: [
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
      },
      { name: "userName", label: "Your Name", type: "text", required: true },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        required: true,
      },
    ],
  },
  {
    id: "confirm",
    text: "Confirm submission?",
    options: [
      { text: "Yes, proceed", value: "confirm" },
      { text: "No, go back", value: "back" },
    ],
  },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", content: questions[0].text },
  ]);
  const [qIndex, setQIndex] = useState(0);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    companyName: "",
    userName: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // start open by default
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }, [messages]);

  const nextQuestion = () => {
    const next = qIndex + 1;
    if (next < questions.length) {
      setQIndex(next);
      setMessages((m) => [
        ...m,
        { type: "bot", content: questions[next].text },
      ]);
    }
  };

  const handleOption = async (opt: Option) => {
    const q = questions[qIndex];
    setMessages((m) => [...m, { type: "user", content: opt.text }]);

    if (q.id === "initial" && opt.value === "no") {
      setMessages((m) => [
        ...m,
        { type: "bot", content: "Thanks for stopping by!" },
      ]);
      setIsComplete(true);
      return;
    }

    if (q.id === "confirm") {
      if (opt.value === "back") {
        setQIndex(1);
        setMessages((m) => m.slice(0, -2));
        return;
      }

      // === direct POST to /chat-lead ===
      setIsSubmitting(true);
      try {
        const res = await fetch(`${BACKEND_API_URL}/chatlead/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        });
        const result = await res.json();
        console.log(result);

        if (res.ok && result.success) {
          setMessages((m) => [
            ...m,
            {
              type: "bot",
              content: `✅ Alright! We'll contact you at ${userDetails.phoneNumber}.`,
            },
          ]);
        } else {
          setMessages((m) => [
            ...m,
            {
              type: "bot",
              content: `❌ Submission failed: ${
                result.error || result.message
              }`,
            },
          ]);
        }
      } catch (e: unknown) {
        const errorMessage =
          e instanceof Error ? e.message : "An unknown error occurred";
        setMessages((m) => [
          ...m,
          { type: "bot", content: `❌ Submission error: ${errorMessage}` },
        ]);
      }
      setIsSubmitting(false);
      setIsComplete(true);
      return;
    }

    nextQuestion();
  };

  const handleSubmitDetails = () => {
    const q = questions[qIndex];
    if (q.type === "input" && q.fields) {
      const missing = q.fields.filter(
        (f) => f.required && !userDetails[f.name]
      );
      if (missing.length) {
        setMessages((m) => [
          ...m,
          {
            type: "bot",
            content: `Please fill: ${missing.map((f) => f.label).join(", ")}`,
          },
        ]);
        return;
      }
      if (!/^\d+$/.test(userDetails.phoneNumber)) {
        setMessages((m) => [
          ...m,
          {
            type: "bot",
            content: "Please enter a valid phone number (digits only).",
          },
        ]);
        return;
      }
      setMessages((m) => [
        ...m,
        {
          type: "user",
          content: `🏢 ${userDetails.companyName}  👤 ${userDetails.userName}  📞 ${userDetails.phoneNumber}`,
        },
      ]);
      nextQuestion();
    }
  };

  const collapse = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsMinimized(true);
    }, 500);
  };

  const restart = () => {
    setMessages([{ type: "bot", content: questions[0].text }]);
    setQIndex(0);
    setUserDetails({ companyName: "", userName: "", phoneNumber: "" });
    setIsComplete(false);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-green-700 to-green-800 text-white rounded-xl shadow-xl hover:shadow-2xl transition-transform hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div
          className={`
            flex flex-col w-80 h-96 bg-white rounded-3xl shadow-2xl overflow-hidden
            border border-gray-200 transition-all duration-500 ease-in-out
            ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-green-800 to-green-700">
            <h4 className="text-white font-semibold">Green Assistant</h4>
            <button onClick={collapse} className="text-white hover:opacity-80">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={msgRef}
            className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 text-sm leading-snug ${
                    m.type === "user"
                      ? "bg-green-700 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
                      : "bg-white text-gray-800 rounded-tr-3xl rounded-br-3xl rounded-tl-xl shadow"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input / Options */}
          <div className="px-4 py-3 bg-white border-t border-gray-200">
            {!isComplete && !isSubmitting ? (
              questions[qIndex].options ? (
                <div className="space-y-2">
                  {questions[qIndex].options!.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => handleOption(o)}
                      className="w-full text-left px-3 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg shadow-sm transition"
                    >
                      {o.text}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {questions[qIndex].fields!.map((f) => (
                    <div key={f.name}>
                      <label className="block text-xs font-medium text-gray-600">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        value={userDetails[f.name]}
                        onChange={(e) =>
                          setUserDetails((u) => ({
                            ...u,
                            [f.name]:
                              f.name === "phoneNumber"
                                ? e.target.value.replace(/\D/g, "")
                                : e.target.value,
                          }))
                        }
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 text-sm"
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleSubmitDetails}
                    className="w-full mt-1 bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded-lg shadow transition"
                  >
                    Continue
                  </button>
                </div>
              )
            ) : isSubmitting ? (
              <div className="text-center text-gray-500 text-sm">
                Submitting…
              </div>
            ) : (
              <button
                onClick={restart}
                className="w-full mt-2 bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded-lg shadow transition"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
