
import BentylBox from '@/components/main/BentylBox'
import Hero from '@/components/main/Hero'
import Encryption from '@/components/main/MainLock'
import StarsCanvas from '@/components/main/Stars'

import React from 'react'

export default function page() {
  return (
    <main className='h-full w-full'>
       <div className='relative h-full w-full'>
        <StarsCanvas />
       </div>
      <div className='flex flex-col gap-30 h-[850px]'>
        
        <Hero />
        <Encryption />
        <BentylBox />
      </div>
    </main>
  )
}
