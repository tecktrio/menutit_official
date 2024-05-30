import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useRevalidator } from 'react-router-dom'
import { StoreBaseUrl } from '../constants'

function ShopList() {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    
    const gotoStore=async(id)=>{
        // localStorage.setItem('store_id',id)
        await axios.get(StoreBaseUrl + 'store/manage?store_id='+id).then(async(res)=>{
            console.log(res.data)
            await axios.get(StoreBaseUrl + 'user/profile?user_id='+res.data.store_owner).then((user)=>{
            console.log(user.data)

                navigate(`store?shop_owner_email=${user.data.email}&store_name=${res.data.store_name}&division_name=main hall`)
    
            })
        })
    }

    const [shopData, setShopData] = useState([])

    const getStores = ()=>{
        axios.get(StoreBaseUrl + 'store/all', {
            'headers':`Token ${token}`
        }).then((res)=>{
            setShopData(res.data)
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(()=>{
        getStores()
    },[])
  return (
    <div className=''>
        {shopData.map(shop=>{
            return (
                <div  onClick={()=>gotoStore(shop.id)} className='border border-gray-500 p-3 m-2 rounded-md cursor-pointer hover:border-blue-500  flex'>
               <img src={shop.store_image_url} className='w-28'/>
               <div className='ml-2'>
               <p>{shop.store_name}</p>

                <div className='text-sm font-bold'>{shop.store_license_number}</div>
                <p className='text-sm text-gray-700'>{shop.store_desription}</p>
                <p>Rating {shop.store_rating}</p>
                <p>Opens days        {shop.store_open_dates}</p>

                </div> 
                </div>
     
            )
        })}
    </div>
  )
}

export default ShopList
