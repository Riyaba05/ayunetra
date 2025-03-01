'use client';

import { useState } from 'react';
import Image from 'next/image';

const suggestedQuestions = [
  {
    text: "Any Ayurvedic solutions to keep my blood sugar...",
    href: "#"
  },
  {
    text: "Do you have any recommendations for anxiety relief?",
    href: "#"
  },
  {
    text: "What are some Ayurvedic remedies for colds?",
    href: "#"
  },
  {
    text: "Explain the concept of Doshas in Ayurveda.",
    href: "#"
  }
];

export default function AyurvedaPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-green-100 rounded-full"></div>
            <span className="text-lg font-semibold">AyuNetra</span>
          </div>
          
          <div className="space-y-4">
         
            
            <div className="pt-4">
              <div className="text-sm text-gray-500 mb-2">Today</div>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">
                  Ayurveda Insights
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold">Ayurveda Insights</h1>
              <span className="text-gray-400">▼</span>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              R
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto py-12 px-4">
            {/* Profile Section */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-4">
                <Image
                  src="/ayurveda-logo.png"
                  alt="Ayurveda Insights"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Ayurveda Insights</h2>
              <p className="text-gray-600 mb-2">By rainierpeak.co</p>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Ayurveda specialist sharing traditional wellness advice and insights! Lets find the best product to help you get better and improve. Get product recommendations with product links right here!!
              </p>
            </div>

            {/* Suggested Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {suggestedQuestions.map((question, index) => (
                <a
                  key={index}
                  href={question.href}
                  className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <p className="text-gray-700">{question.text}</p>
                </a>
              ))}
            </div>

            {/* Message Input */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
              <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything"
                  className="w-full p-4 pr-12 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={1}
                />
                <button className="absolute right-4 bottom-4 p-1 rounded-lg hover:bg-gray-100">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 