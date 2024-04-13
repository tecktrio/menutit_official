import React from 'react'

const Aqua = (props) => {

    // store name

  return (
  <div className='overflow-y-hidden '>
    <div id='top_banner' style={{'backgroundImage':"url('https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}} className='p-10  text-white w-screen '>
      <p className='text-4xl'>
      {props.data['store_name']}
      Shop Details
      <p>Contact Detail {props.data.contact}</p>
      <p>License Number {props.data.license}</p>
      </p>
      <p id='description'>
          Let us make your time valuable.
      </p>
    </div>
    <section className='flex justify-center h-40 items-center'>
        <input type='text' className='w-1/2 border border-gray-500 m-2 p-6 h-10 rounded-2xl' placeholder='search' onKeyUp={(e)=>props.search(e.target.value)}/>
      </section>
    

    <section id='body' className='flex w-screen'>

     
          <section id='shop_products'  className='flex m-10' style={{maxHeight:'33rem'}}>
            {props.data.products != []?props.data.products.map((item, index)=>{
               return (
                <div className='border border-gray-500 p-3 m-3 w-auto rounded-lg'>
                    <img src={item.product_image_url} className='w-40 h-28   rounded-lg'/>
                    

                    <p className='text-lg'>{item.product_name}</p>
                    <p className='text-xs text-gray-500 h-10 w-48'>{item.product_description}</p>
                    <p className='text-red-600 text-lg font-bold'>Rs.{item.product_price}</p>
                    {/* <p>Our Current Rating <p>3.4</p></p> */}
                </div>
   
               )
            })
            :"Not Found"}

          </section>
      </section>
  </div>
  )
}

export default Aqua
