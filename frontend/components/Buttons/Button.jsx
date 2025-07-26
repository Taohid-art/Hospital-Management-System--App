import React from 'react'
import Link from 'next/link'
const Button = ({href,text}) => {
  return (
    <div>
        <button className=' mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300'>
           <Link href={href}>{text}</Link>
        </button>
    </div>
  )
}

export default Button