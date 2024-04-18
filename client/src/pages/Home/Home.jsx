import React from 'react'
import {useNavigate}  from 'react-router-dom'
import ShopList from '../../components/ShopList'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
function Home() {
    const navigate = useNavigate()
  return (
    <div className=' w-screen'>



        <section className=''>
          <nav className='flex justify-between p-2'>
            <img src='logo192.png' className='w-6'/>
            <p><a href='/login'>Login</a></p>
          </nav> 
          <Carousel>
                <div>
                    <img src="banner3.jpg" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src="banner2.jpg"  />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img  src="banner1.png" />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
          {/* <div id='banner' className='w-screen p-2'>
            <img src='banner1.png' className='w-full'/>
          </div> */}
          <div className='p-4'>
            <ShopList/>
          </div>
        </section>
        <footer className='bg-blue-950 w-screen text-white p-4'>
          <p>Services</p>
          <div className='text-sm p-2 text-gray-400'>
            <p>Booking</p>
            <p>Menu View</p>
          </div>
        </footer>
      
       
    </div>
  )
}

export default Home
