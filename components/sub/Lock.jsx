import React from 'react'


export default function Lock() {
  return (
    <video 
    autoPlay
    muted 
    loop
    className='"'
    >
        <source src='encryption.webm' type='video/webm'/>
    </video>
  )
}
