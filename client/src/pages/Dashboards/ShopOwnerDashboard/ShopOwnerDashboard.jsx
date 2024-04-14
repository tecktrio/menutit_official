import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StoreBaseUrl } from '../../../constants'

function ShopOwnerDashboard(props) {

    const [stores, setStores]= useState([])

    const getStores = async()=>{
        axios.get(StoreBaseUrl + 'user/stores', {
            'headers':{
                'Authorization':`Token ${localStorage.getItem('token')}`
            }
        }).then((res)=>{
            console.log(res.data)
            setStores(res.data)
        }).catch((e)=>{
            console.log(e)
        })
    }

    const getProducts = async()=>{
        axios.get(StoreBaseUrl + 'store/product',{
            'headers':{
                'Authorization':`Token ${localStorage.getItem('token')}`
            },

        }).then((res)=>{
            console.log(res.data)
            setStores(res.data)
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(()=>{
        getStores()
    },[])

  return (
    <div>
      <nav className='bg-blue-950 w-screen flex justify-between p-2'>
        <p>Menu</p>
        <div>
            <p>Login</p>
            <p>Documentation</p>
            <p>About</p>
        </div>
      </nav>
      <div className='w-screen'>
        <div id='sidebar' className='bg-blue-950 w-1/5'>
            <div>
                <p>Account</p>
                <p>Stores</p>
            </div>
        </div>
        <div id='window' className=''>

        </div>
      </div>
      

      {/* {stores.map(store=>{
        return (
            <>
            <p>store name : {store.store_name}</p>
            <p>store license number : {store.store_license_number}</p>
            <p>store Description : {store.store_description}</p>
            <p>store image_url : {store.store_image_url}</p>
            <p>store opening days : {store.store_open_dates}</p>
            <p>store rating: {store.store_rating}</p>
            

            </>
        )
      })} */}
    </div>
  )
}

export default ShopOwnerDashboard
