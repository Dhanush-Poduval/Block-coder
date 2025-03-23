'use client';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

// Initialize Firebase Auth (this assumes Firebase is already initialized)
const auth = getAuth();

export default function CodingChallengePage({ mode, difficulty, player1, player2 }) {
    const [code, setCode] = useState("// Write your code here");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [playerProgress, setPlayerProgress] = useState({ player1: 0, player2: 0 });
    const [question, setQuestion] = useState(null);
    const [userName, setUserName] = useState(""); // To store GitHub profile name
    const editorRef = useRef(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch("http://localhost:8000/generate_questions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ difficulty }),
                });
                if (!response.ok) throw new Error("Failed to fetch question");
                const data = await response.json();
                setQuestion(data);
            } catch (error) {
                console.error("Error fetching question:", error);
                setOutput(`Error: ${error.message}`);
            }
        };

        fetchQuestion();
    }, [difficulty]);

    // Handle Firebase user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Retrieve the GitHub profile name from user
                setUserName(user.displayName || "Guest"); // This assumes `displayName` contains the GitHub username
            } else {
                setUserName("Guest");
            }
        });

        return () => unsubscribe(); // Clean up the listener
    }, []);

    // Timer logic
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
                updatePlayerProgress();
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const updatePlayerProgress = () => {
        setPlayerProgress((prev) => ({
            player1: Math.min(prev.player1 + Math.random() * 10, 100),
            player2: Math.min(prev.player2 + Math.random() * 10, 100),
        }));
    };

    const runCode = async () => {
        setLoading(true);
        setOutput("");
        try {
            const response = await fetch("http://localhost:8000/execute_code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language, code }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Error executing code");
            }

            const result = await response.json();
            setOutput(result.output);
        } catch (err) {
            setOutput(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (editorRef.current) {
                editorRef.current.layout();
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
        setTimeout(() => {
            editor.layout();
        }, 100);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white" style={{ height: "100vh" }}>
            {/* Header Section */}
            <div className="flex justify-between items-center p-2 bg-gray-800">
                <h1 className="text-lg font-bold">
                    {mode === "ai" ? "Challenge AI" : "Multiplayer Battle"} - Difficulty: {difficulty}
                </h1>

                {/* Language Selector */}
                <select
                    value={language}
                    onChange={(e) => {
                        setLanguage(e.target.value);
                        if (e.target.value === "javascript") {
                            setCode("// Write your code here");
                        }
                    }}
                    className="bg-gray-700 text-white p-2 rounded"
                >
                    <option value="javascript">JavaScript</option>
                </select>

                {/* Run Button */}
                <button
                    onClick={runCode}
                    className={`bg-blue-500 px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Running..." : "Run"}
                </button>
            </div>

            {/* New Question Display Section */}
            {question && (
                <div className="p-4 bg-gray-800 border-b border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold">{question.title}</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                                Difficulty: {question.difficulty}
                            </span>
                            <a
                                href={question.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                                View Problem
                            </a>
                        </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="mb-4">
                        <pre className="whitespace-pre-wrap font-sans bg-gray-900 p-3 rounded overflow-auto max-h-40">
                            {question.statement}
                        </pre>
                    </div>

                    {/* Hint Section */}
                    <details className="group">
                        <summary className="flex items-center cursor-pointer text-blue-400 hover:text-blue-300">
                            <span className="mr-2">Show Hint</span>
                            <svg
                                className="w-4 h-4 transition-transform group-open:rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </summary>
                        <p className="mt-2 text-gray-300 p-3 bg-gray-900 rounded">
                            {question.hint}
                        </p>
                    </details>
                </div>
            )}

            {/* Timer Section */}
            <div className="flex items-center p-2 bg-gray-800">
                <span className="text-sm font-bold">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
                <div className="w-full bg-gray-700 ml-3 rounded overflow-hidden">
                    <div
                        style={{ width: `${(300 - timeLeft) / 3}%` }}
                        className="bg-blue-500 h-3"
                    ></div>
                </div>
            </div>

            {/* Progress Bars for Both Players */}
            <div className="p-2 bg-gray-800">
                {[userName, "Player 2"].map((playerName, index) => (
                    <div key={index} className="mb-1">
                        <span className="font-bold text-xs">{playerName} Progress ({playerProgress[`player${index + 1}`].toFixed(0)}%):</span>
                        <div className="w-full bg-gray-700 rounded overflow-hidden mt-1">
                            <div
                                style={{ width: `${playerProgress[`player${index + 1}`]}%` }}
                                className={`h-3 ${index === 0 ? "bg-green-500" : "bg-red-500"}`}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Section */}
            <div className="flex flex-1 p-2" style={{ height: "calc(100vh - 180px)", minHeight: "400px" }}>
                {/* Code Editor */}
                <div style={{ width: "65%", height: "100%" }} className="border border-gray-700 rounded overflow-hidden">
                    <div style={{ width: "100%", height: "100%" }}>
                        <Editor
                            height="100%"
                            width="100%"
                            language={language}
                            value={code}
                            theme="vs-dark"
                            onChange={(val) => setCode(val || "")}
                            onMount={handleEditorDidMount}
                            options={{
                                automaticLayout: true,
                                minimap: { enabled: false }
                            }}
                        />
                    </div>
                </div>

                {/* Output Section */}
                <div style={{ width: "33%", marginLeft: "2%" }} className="bg-black text-green-400 p-3 border border-gray-700 rounded overflow-auto">
                    <h3 className="font-bold">Output:</h3>
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
}
