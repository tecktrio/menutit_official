import React, { useEffect, useState } from 'react'
import Aqua from '../Themes/Aqua/Aqua'
import { Darker } from '../Themes/Darker/Darker'
import axios from 'axios'
import {StoreBaseUrl} from '../constants'

function StoreView() {
 const [theme, setTheme] = useState('aqua')
 const [storeData, setStoreData] = useState({
   'store_name':'',
   'contact':'',
   'license':'',
   'products':[]
})

const [params, setParams] = useState({
   'shop_owner_email':"",
   'division_name':"",
   'store_name':""
})


 const getProducts =async(shop_owner_email, division_name, store_name)=>{
      await axios.get(StoreBaseUrl + `store/product?shop_owner_email=`+ shop_owner_email + '&store_name='+ store_name + '&division_name=' + division_name).then((res)=>{
      console.log(res.data)
      setStoreData({...storeData, products:res.data})
   }).catch((e)=>{
   })
  
}

const search =async(keyword,)=>{
   if (keyword != null){
      await axios.get(StoreBaseUrl + `store/product?shop_owner_email=${params.shop_owner_email }&store_name=${params.store_name}&division_name=${params.division_name}&search=${keyword}`).then((res)=>{
      setStoreData({...storeData, products:res.data})
      }).catch((e)=>{
      })
   }
}

const getStoreData = async(shop_owner_email, division_name, store_name)=>{
  await axios.get(StoreBaseUrl + `store/manage?shop_owner_email
  =` +  shop_owner_email + '&store_name='+ store_name ).then((res)=>{
   setStoreData({...storeData, store_name:res.data.store_name, contact: res.data.contact})
  console.log('store',res.data)

  }) 
}

const loadStore = ()=>{
   const parameters = new URLSearchParams(window.location.search)
   const shop_owner_email = parameters.get('shop_owner_email')
   const division_name = parameters.get('division_name')
   const store_name= parameters.get('store_name')
   
   console.log(shop_owner_email, division_name, store_name)
   getStoreData(shop_owner_email, division_name, store_name)
   getProducts(shop_owner_email, division_name, store_name)
   setParams({
      "shop_owner_email":shop_owner_email,
      "division_name":division_name,
      "store_name" : store_name
   })

}

 useEffect(()=>{
   loadStore()
 },[])

  return (
    <div>
        {theme === 'aqua' ?<Aqua data = {storeData} search = {search}/>:""}
        {theme === 'darker'?<Darker data={storeData}/>:""}
    </div>
  )
}

export default StoreView
