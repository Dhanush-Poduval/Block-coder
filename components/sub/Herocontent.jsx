"use client";
import React, { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motions";
import Link from "next/link";

const BotModel = () => {
  const { scene, animations } = useGLTF("/robot_playground.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions["Experiment"]) {
      actions["Experiment"].reset().play();
    }
  }, [actions]);

  return (
    <primitive
      object={scene}
      scale={2.5}
      position={[0, -1.5, 0]}
    />
  );
};

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div variants={slideInFromTop} className="opacity-[0.9] flex items-center">
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[30px]">Code Blocker</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Elevating{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              futuristic{" "}
            </span>
            ideas with AI and Blockchain.
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          EduChain-based platform that combines AI tutoring with blockchain credentialing to help users master competitive coding.
        </motion.p>

        <div className="flex gap-4">
          {/* Sign Up Button */}
          <Link href="/signup">
            <motion.button
              variants={slideInFromLeft(1)}
              className="py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-lg rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer max-w-[200px] text-center"
            >
              Sign Up
            </motion.button>
          </Link>

          {/* Login Button */}
          
        </div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-[500px] h-[500px] flex justify-center items-center"
      >
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} intensity={1} />
            <BotModel />
          </Suspense>
        </Canvas>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
