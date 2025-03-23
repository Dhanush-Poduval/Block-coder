"use client";
import Link from "next/link";
import React from "react";

export default function Page() {
  const navigationItems = [
    { label: "Challenge", path: "StoryMode" },
    { label: "Story Mode", path: "dashboard3" }
  ];

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-12 bg-[#1a1a1a]">
      <h1 className="hero">Choose Your Path</h1>

      <div className="flex flex-col gap-8">
        {navigationItems.map((item) => (
          <Link 
            href={`/${item.path}`} 
            key={item.path}
            className="block" // Added for better link handling
          >
            <button
              className="relative px-12 py-6 text-3xl font-extrabold text-white uppercase tracking-widest transition-all bg-gray-800 border-8 border-gray-700 hover:bg-gray-700 hover:border-gray-600 active:translate-y-2"
              style={{
                boxShadow: "8px 8px 0 #3b3b3b, 12px 12px 0 #1f1f1f, 16px 16px 0 #000",
                letterSpacing: "5px",
              }}
            >
              {item.label}
              <div
                className="absolute inset-0 w-full h-full animate-pulse"
                style={{
                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.7) 80%)",
                }}
              ></div>
            </button>
          </Link>
        ))}
      </div>
    </main>
  );
}
