import React from 'react'
import {useNavigate}  from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center h-screen w-screen'>

      <nav>
        <p>Login</p>
        </nav>

        <section>
          <h3>MENUIT</h3>
          <ShopList/>
        </section>
      
       
    </div>
  )
}

export default Home
