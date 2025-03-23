import Image from 'next/image'
import React from 'react'

export default function BentylBoxContent({ src, title, description }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
     

      <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]">
        <Image
          src={src}
          alt={title} 
          width={1000}
          height={1000}
          className="w-full object-contain"
        />

        <div className="relative p-4">
          <h1 className="text-2xl font-semibold text-white"></h1>
          <p className="mt-2 text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  )
}
