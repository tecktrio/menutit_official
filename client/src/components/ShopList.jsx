import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ShopList() {

    const navigate = useNavigate()

    const [shopData, setShopData] = useState([
        {
            'shopName':"Malabar",
            'LicenseNumber':223123123242
        },
        {
            'shopName':"Malabar",
            'LicenseNumber':223123123242
        },
    ])
  return (
    <div >
        {shopData.map(shop=>{
            return (
                <div  onClick={()=>navigate('store')} className='border border-black p-3'>
                 <p>Shop Name {shop.shopName}</p>
                <p>Shop License {shop.LicenseNumber}</p>

                </div>
     
            )
        })}
    </div>
  )
}

export default ShopList
