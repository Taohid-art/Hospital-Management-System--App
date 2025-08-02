import React from 'react'
import Image from 'next/image'
import logo from '@/public/images/vector.png'
import Link from 'next/link'
const nav = () => {
  const admin = true
  return (
    <div>
       <header className='h-24 bg-[#EFFBFF] flex items-center justify-between px-8'>
        <div className="logo flex items-center space-x-2">
            <Image src={logo} alt="Logo" width={30} height={30} />
            <h2 className='text-xl text-[#102D47] font-bold'>Health Care</h2>
        </div>
        <nav  className='flex items-center justify-between gap-10'>
            <ul className='flex items-center justify-around gap-4'>
                <li className=' hover:text-blue-500 ' ><Link  href="/">Home</Link></li>
                <li className=' hover:text-blue-500 '><Link href="/doctors">Doctors</Link></li>
                <li className=' hover:text-blue-500 '><Link href="/about">About</Link></li>
                <li className=' hover:text-blue-500 '><Link href="/contact">Contact</Link></li>
               {admin && <li className=' hover:text-blue-500 '><Link href="/dashboard">Dashboard</Link></li>
               } 

            </ul>
            <div>
                <Link href="/login" className='bg-blue-500 text-white px-4 py-2 rounded'>Login</Link>
                <Link href="/register" className='bg-green-500 text-white px-4 py-2 rounded ml-2'>Register</Link>
            </div>
        </nav>
       </header>
    </div>
  )
}

export default nav