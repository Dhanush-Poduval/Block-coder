"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Levels() {
  const [difficulty, setDifficulty] = useState("easy");
  const router = useRouter();

  const handleDifficulty = (level) => {
    setDifficulty(level);
    console.log("Selected Level:", level);
    // After selecting difficulty, navigate to the dashboard with the selected difficulty
    router.push(`/dashboard2?difficulty=${level}`);
  };

  const levels = ["easy", "medium", "hard"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white">
      <h1 className="text-4xl font-extrabold mb-8 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-400">
        Select Your Difficulty
      </h1>

      <div className="flex space-x-6">
        {levels.map((level, index) => (
          <button
            key={index}
            onClick={() => handleDifficulty(level)}
            className={`px-6 py-2 rounded-lg transition cursor-pointer ${
              difficulty === level
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
    
  );
  
}
