import React from 'react'
import {useNavigate}  from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ShopList from './ShopList/ShopList';
import { Carousel } from 'react-responsive-carousel';

function LandingPage() {


  
  return (
    <div className=' w-screen'>
        <section className=''>
          {/* <nav className='flex justify-between p-2'>
            <img src='logo192.png' className='w-6'/>
          </nav>  */}
          <nav className='hidden md:flex'>
            <table className='w-screen flex justify-end p-5'>
              <tr>
                <td className='px-4 cursor-pointer hover:text-green-900'>About</td>
                <td className='px-4 cursor-pointer hover:text-green-900'>Store Login</td>
                <td className='px-4 cursor-pointer hover:text-green-900'>Account</td>
                <td className='px-4 cursor-pointer hover:text-green-900'>Favorate Stores</td>
              </tr>
            </table>
          </nav>
          <div className='p-2'>
          <Carousel autoPlay={true}  infiniteLoop={true} interval={2000} showIndicators={false} showThumbs={false} >
                <div>
                    <img src="banner3.jpg" />
                </div>
                <div>
                    <img src="banner2.jpg"  />
                </div>
                <div>
                    <img  src="banner1.jpg" />
                </div>
                <div>
                    <img  src="banner4.jpg" />
                </div>
            </Carousel>
          </div>
          
          
          <div className='p-4 w-screen'>
            <ShopList/>
          </div>
        </section>
        <footer className='bg-blue-950 w-screen text-white p-4  bottom-0'>
          <p>Services</p>
          <div className='text-sm p-2 text-gray-400'>
            <p>Booking</p>
            <p>Menu View</p>
          </div>
        </footer>
      
       
    </div>
  )
}

export default LandingPage
