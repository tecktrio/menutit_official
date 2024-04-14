import React from 'react'
import {useNavigate}  from 'react-router-dom'
import ShopList from '../../components/ShopList'
function Home() {
    const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center h-screen w-screen'>



        <section>
          <nav className='flex justify-between'>
            <img src='logo192.png' className='w-6'/>
            <p><a href='/login'>Login</a></p>
          </nav>
          <div id='banner' className='w-screen p-2'>
            <img src='banner1.png' className='w-full'/>
          </div>
          <div>
            <ShopList/>
          </div>
        </section>
      
       
    </div>
  )
}

export default Home
