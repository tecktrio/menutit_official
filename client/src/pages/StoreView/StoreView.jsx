import React, { useEffect, useState } from 'react'
import Aqua from '../../Themes/Aqua/Aqua'
import { Darker } from '../../Themes/Darker/Darker'
import axios from 'axios'
import {StoreBaseUrl} from '../../constants'

function StoreView() {
 const [theme, setTheme] = useState('aqua')
 const [storeData, setStoreData] = useState({
   'store_name':'',
   'contact':'',
   'license':'',
   'products':[]
})

 const getProducts =async()=>{
      await axios.get(StoreBaseUrl + '/api/store/product?shop_owner_username=amal&division_name=main hall&store_name=malabar').then((res)=>{
      console.log(res.data)
      setStoreData({...storeData, products:res.data})
   }).catch((e)=>{
   })
  
}
const search =async(keyword)=>{
   if (keyword != null){
      await axios.get(StoreBaseUrl + `/api/store/product?shop_owner_username=amal&division_name=main hall&store_name=malabar&search=${keyword}`).then((res)=>{

      console.log("searching...")
      setStoreData({...storeData, products:res.data})

      }).catch((e)=>{
      })
   }
   
  
}

const getStoreData = async()=>{
   const store_owner_username  = "amal"
   const division_name = "main hall"
   const store_name = "malabar"

  await axios.get(StoreBaseUrl + store_owner_username + store_name + division_name ).then((res)=>{
   setStoreData(res.data)
  })
   
}

 useEffect(()=>{
    getProducts()
 },[])

  return (
    <div>
        {theme === 'aqua'?<Aqua data = {storeData} search = {search}/>:""}
        {theme === 'darker'?<Darker data={storeData}/>:""}
    </div>
  )
}

export default StoreView
