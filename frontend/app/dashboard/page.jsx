import React from 'react'
import Link from 'next/link';
const page = () => {
  return (
    <div>
      <Link href='/dashboard/department' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300'>
      Department
      </Link>
    </div>
  )
}

export default page