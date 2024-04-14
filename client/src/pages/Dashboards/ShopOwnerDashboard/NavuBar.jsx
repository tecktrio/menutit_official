import React from 'react'

export const NavuBar = () => {
  return (
    <nav className="bg-black w-screen flex justify-between p-2">
    <p>Menu</p>
    <div  className='flex gap-8 pr-10'>
      <p className='text-gray-50'>Home</p>
      <p className='text-gray-50'>About</p>
      <p className='text-gray-50'>Documentation</p>
      <p className='text-gray-50'>Logout</p>
    </div>
  </nav>
  )
}
