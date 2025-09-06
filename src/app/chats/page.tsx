// app/chats/page.tsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/outline";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

const dummyMessages: Message[] = [
  { id: 1, text: "Hey there!", sender: "other", timestamp: "10:00 AM" },
  { id: 2, text: "Hi! How are you?", sender: "me", timestamp: "10:02 AM" },
  {
    id: 3,
    text: "I'm good, thanks. Wanna catch up later?",
    sender: "other",
    timestamp: "10:05 AM",
  },
  {
    id: 4,
    text: "Sure, let me know when.",
    sender: "me",
    timestamp: "10:06 AM",
  },
  { id: 5, text: "How about 6 PM?", sender: "other", timestamp: "10:08 AM" },
  { id: 6, text: "Sounds perfect!", sender: "me", timestamp: "10:10 AM" },
];

export default function Chats() {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [newText, setNewText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll to bottom on new message
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!newText.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: newText.trim(),
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setNewText("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center bg-green-600 text-white px-4 py-2">
        <button className="mr-2">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <Image
          src="/avatar.png"
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-3">
          <p className="font-semibold">John Doe</p>
          <p className="text-xs">Online</p>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] px-4 py-2 rounded-lg relative ${
              msg.sender === "me"
                ? "bg-green-500 text-white ml-auto"
                : "bg-white text-gray-800 mr-auto"
            }`}
          >
            <p>{msg.text}</p>
            <span className="block text-xs mt-1 text-gray-200 text-right">
              {msg.timestamp}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center px-4 py-2 bg-white border-t border-gray-300">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-500"
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-green-600 rounded-full hover:bg-green-700"
        >
          <PaperAirplaneIcon className="h-5 w-5 text-white rotate-90" />
        </button>
      </div>
    </div>
  );
}
