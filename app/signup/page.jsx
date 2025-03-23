'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Web3 from 'web3';  // Import Web3.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    auth,
    provider as githubProvider,
    signInWithPopup,
  } from "@/components/authentication/firebaseconfig"; // Import GitHub provider
  import { GithubAuthProvider } from "firebase/auth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [walletAddress, setWalletAddress] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if wallet is connected on page load
    checkWalletConnection();
  }, []);

  // 🔥 Handle Wallet Connection (MetaMask)
  const handleWalletConnection = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);  // Create a Web3 instance
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request wallet connection
        const accounts = await web3.eth.getAccounts();  // Get connected accounts
        const userAddress = accounts[0];
        setWalletAddress(userAddress);
        toast.success(`Wallet connected: ${userAddress}`);
        // Redirect to dashboard after successful wallet connection
        router.push("/dashboard");
      } else {
        toast.error("Please install MetaMask to connect your wallet.");
      }
    } catch (error) {
      toast.error("Error during wallet connection: " + error.message);
    }
  };

  const checkWalletConnection = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();  // Get connected accounts
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]); // Set wallet address if already connected
        }
      } else {
        toast.error("MetaMask is not installed. Please install MetaMask to proceed.");
      }
    } catch (error) {
      toast.error("Error checking wallet connection: " + error.message);
    }
  };

  const handleGitHubAuth = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      toast.success(`Logged in as ${user.displayName || "GitHub User"}`);

      // Redirect to dashboard after successful GitHub login
      router.push("/dashboard");
    } catch (error) {
      toast.error("GitHub authentication failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        
        <button
          onClick={handleWalletConnection}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full mb-4"
        >
          Connect Wallet
        </button>

        {/* 🔥 GitHub Login Button */}
        <button
          onClick={handleGitHubAuth}
          className="bg-gray-800 text-white p-2 rounded hover:bg-gray-900 w-full mb-4"
        >
          Sign in with GitHub
        </button>

        {/* 🔥 Switch Between Login/Signup */}
        <p
          className="mt-4 text-sm text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
  
};

export default Auth;
