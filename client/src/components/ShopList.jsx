import React, { useState } from 'react'

function ShopList() {

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
    <div>
        {shopData.map(shop=>{
            return (
                <>
                 <p>Shop Name {shop.shopName}</p>
      <p>Shop License {shop.LicenseNumber}</p>

                </>
     
            )
        })}
    </div>
  )
}

export default ShopList
