'use client';
import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";

export default function CodingChallengePage() {
    const [code, setCode] = useState("console.log('Hello, World!')"); // Default JavaScript code
    const [output, setOutput] = useState(""); // Output from code execution
    const [loading, setLoading] = useState(false); // Loading state
    const editorRef = useRef(null); // Reference to Monaco Editor instance

    // Run JavaScript code directly in the browser
    const runCode = async () => {
        setLoading(true);
        setOutput(""); // Clear previous output
        try {
            // Using eval to run the JavaScript code in the browser
            const result = eval(code); 
            setOutput(result || 'No output'); 
        } catch (err) {
            setOutput(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Resize handler for dynamic layout adjustment
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
        // Force layout refresh when editor mounts
        setTimeout(() => {
            editor.layout();
        }, 100);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white" style={{ height: "100vh" }}>
            {/* Header Section */}
            <div className="flex justify-between items-center p-2 bg-gray-800">
                {/* Run Button */}
                <button 
                    onClick={runCode} 
                    className={`bg-blue-500 px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Running..." : "Run"}
                </button>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-1 p-2" style={{ height: "calc(100vh - 80px)", minHeight: "400px" }}>
                {/* Code Editor */}
                <div style={{ width: "65%", height: "100%" }} className="border border-gray-700 rounded overflow-hidden">
                    <div style={{ width: "100%", height: "100%" }}>
                        <Editor
                            height="100%"
                            width="100%"
                            language="javascript"
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
