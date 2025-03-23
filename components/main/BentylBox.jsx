import React from 'react'
import BentylBoxContent from '@/components/sub/BentylBoxContent'


export default function BentylBox() {
  return (
   <div className=''>
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20 text-center">
        Our Features
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <BentylBoxContent
          src="/NextWebsite.png"
          title="Promotes Experimentation:"
          description="Block coding encourages experimentation and creativity by allowing users to easily try different combinations of blocks without fear of breaking the code.This interactive approach helps build confidence and sustains motivation, especially for beginners."
        />
        <BentylBoxContent
          src="/CardImage.png"
          title="Inclusive and Accessible:"
          description="Block coding is accessible to people of all ages and backgrounds, including those with learning disabilities, due to its intuitive interface.It provides a smooth transition to more advanced programming languages by teaching fundamental coding concepts."
        />
        <BentylBoxContent
          src="/SpaceWebsite.png"
          title="Fun Learning Experience:"
          description="Learning through block coding is often more engaging and enjoyable, as it involves visual and interactive elements.It helps learners understand programming concepts more quickly and effectively"
        />
      </div>
    </div>
   
   
  )
}
