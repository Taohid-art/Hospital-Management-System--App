import React from 'react'
import Link from 'next/link'
const Button = ({href,text}) => {
  return (
    <div>
        <button className='mt-6 cursor-pointer bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 animate-pulse-custom'>
           <Link href={href}>{text}</Link>
        </button>
    </div>
  )
}

export default Button