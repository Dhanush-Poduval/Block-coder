'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import Editor from '@/components/main/Editor';

// Dynamically import MonacoEditor to disable SSR
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const Page = () => {
  const router = useRouter();
  const { query } = router;

  const difficulty = query?.difficulty || "easy"; // Default to "easy" if not provided

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript"); // Default language is JavaScript
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState("");
  const [output, setOutput] = useState(""); // To store output from the code execution
  
  useEffect(() => {
    const fetchProblem = async (difficulty) => {
      try {
        const response = await fetch("http://localhost:8000/api/fetch-problem/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ difficulty }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch problem");
        }

        const data = await response.json();

        // Log the entire response data to check if hint is present
        console.log("Fetched Data:", data);

        if (data.error) {
          console.error("Error:", data.error);
          setProblem({ error: data.error });
        } else {
          setProblem(data);
          setHint(data.hint || "No hint available");  // Use the hint or fallback
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
        setProblem({ error: error.message });
        setLoading(false);
      }
    };

    fetchProblem(difficulty);
  }, [difficulty]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(""); // Clear the code when language changes
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = async () => {
    try {
      const response = await fetch("http://localhost:5000/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          language: language,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setOutput(`Error: ${data.error}`);
      } else {
        setOutput(data.output);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white p-4">
      {/* Problem title */}
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-400">
        Problem: {problem?.title || "Loading..."}
      </h1>

      {/* Display loading state */}
      {loading ? (
        <p>Loading...</p>
      ) : problem?.error ? (
        <p>{problem.error}</p>
      ) : (
        <>
          {/* Problem Statement */}
          <div className="w-full max-w-4xl p-4 mb-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Problem Statement</h2>
            <p>{problem?.statement}</p>
          </div>

          {/* Code Editor Section */}
          <div className="w-full max-w-5xl p-4 mb-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Code Editor</h2>
            <div className="w-full h-96">
              {/* Adjust the height to make it more spacious */}
              <MonacoEditor
                height="500px"  // Adjusted height to make editor bigger
                language={language}
                value={code}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  selectOnLineNumbers: true,
                  minimap: { enabled: false },
                }}
              />
            </div>
          </div>

          {/* Output Section */}
          <div className="w-full max-w-4xl p-4 mb-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Output</h2>
            <p>{output || "Run your code to see output"}</p>
          </div>

          {/* AI Hint Section */}
          <div className="w-full max-w-4xl p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">AI Hint</h2>
            <p>{problem?.hint}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
