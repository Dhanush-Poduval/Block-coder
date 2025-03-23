"use client";
import Levles from "@/components/dashboard/Levles";

import Link from "next/link";
import React, { useState } from "react";

// You can import an icon library like FontAwesome for the profile icon
import { FaUserCircle } from 'react-icons/fa'; // or use any other icon library or custom icon

export default function Page() {
  return (
    <main className="relative">
      <Link href='/Certificate'>
        <div className="absolute top-4 right-4 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300 cursor-pointer">
          <FaUserCircle className="text-white text-3xl" />
        </div>
      </Link>
      

      {/* Main Content */}
      <div>
        <Levles />
      </div>
    </main>
  );
}
