'use client';
import React, { useState, useEffect } from "react";
import CodingChallengePage from "@/app/multiplayer/page";
import ChallengeAIPage from "@/app/Challenge/page";

export default function App() {
    const [selectedMode, setSelectedMode] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [showChallengePage, setShowChallengePage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const resetVideo = setInterval(() => {
                const iframe = document.querySelector('iframe[title="background-video"]');
                if (iframe) {
                    // Fix self-assignment by adding cache buster
                    iframe.src = iframe.src.split('?')[0] + `?${new Date().getTime()}`;
                }
            }, 300000);
            
            return () => clearInterval(resetVideo);
        }
    }, []);

    const handleStartChallenge = () => {
        if (!selectedMode) {
            setErrorMessage("Please select a mode.");
            return;
        }
        setErrorMessage("");
        setShowChallengePage(true);
    };

    if (showChallengePage) {
        const player1Name = "Player 1";
        const player2Name = selectedMode === "multiplayer" ? "Player 2" : null;

        return selectedMode === "ai" ? (
            <ChallengeAIPage 
                difficulty={difficulty} 
                player1Name={player1Name} 
            />
        ) : (
            <CodingChallengePage 
                mode={selectedMode} 
                difficulty={difficulty} 
                player1={player1Name} 
                player2={player2Name}
            />
        );
    }

    const youtubeVideoId = "Areaonibj-w";
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0`;

    return (
        <div style={{ 
            position: "relative",
            width: "100vw",
            height: "100vh",
            overflow: "hidden"
        }}>
            {/* YouTube Video Background */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                pointerEvents: "none",
                overflow: "hidden"
            }}>
                <iframe
                    title="background-video"
                    width="100%"
                    height="100%"
                    src={youtubeEmbedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%) scale(1.2)",
                        minWidth: "100%",
                        minHeight: "100%"
                    }}
                ></iframe>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    pointerEvents: "none"
                }}></div>
            </div>

            {/* Content Container */}
            <div style={{ 
                position: "relative",
                zIndex: 1,
                padding: "20px",
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1 style={{ 
                    color: "#ff8c00",
                    textShadow: "0 0 10px #ff8c00, 0 0 20px #ff4500, 0 0 30px #ff0000",
                    marginBottom: "2rem"
                }}>
                    Coding Challenge Platform
                </h1>

                {/* Mode Selection */}
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ 
                        marginRight: "10px", 
                        color: "white",
                        fontSize: "1.1rem"
                    }}>
                        Select Mode:
                    </label>
                    <select 
                        value={selectedMode} 
                        onChange={(e) => setSelectedMode(e.target.value)} 
                        style={{ 
                            padding: "8px 12px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            backgroundColor: "rgba(255,255,255,0.9)"
                        }}
                    >
                        <option value="">Select...</option>
                        <option value="ai">Challenge AI</option>
                        <option value="multiplayer">Multiplayer Battle</option>
                    </select>
                </div>

                {/* Difficulty Selection */}
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ 
                        marginRight: "10px", 
                        color: "white",
                        fontSize: "1.1rem"
                    }}>
                        Select Difficulty:
                    </label>
                    <select 
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value)} 
                        style={{ 
                            padding: "8px 12px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            backgroundColor: "rgba(255,255,255,0.9)"
                        }}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div style={{ 
                        color: "#ff4444", 
                        marginBottom: "20px", 
                        fontWeight: "bold"
                    }}>
                        {errorMessage}
                    </div>
                )}

                {/* Start Challenge Button */}
                {selectedMode && (
                    <button 
                        onClick={handleStartChallenge}
                        style={{
                            backgroundColor: "#007BFF",
                            color: "white",
                            padding: "12px 24px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "1.1rem",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                            ":hover": {
                                backgroundColor: "#0056b3",
                                transform: "translateY(-2px)"
                            }
                        }}
                    >
                        Start Challenge
                    </button>
                )}
            </div>
        </div>
    );
}
