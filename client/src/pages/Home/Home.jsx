import React from 'react'
import {useNavigate}  from 'react-router-dom'
import ShopList from '../../components/ShopList'
function Home() {
    const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center h-screen w-screen'>

      <nav>
        {/* <p onClick={()=>navigate('/login')}>Login</p> */}
        </nav>

        <section>
          <h3>MENUIT</h3>
          <div>
            <ShopList/>
          </div>
        </section>
      
       
    </div>
  )
}

export default Home
