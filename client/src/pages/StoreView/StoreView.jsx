import React, { useEffect, useState } from 'react'
import Aqua from '../../Themes/Aqua/Aqua'
import { Darker } from '../../Themes/Darker/Darker'
import axios from 'axios'
import {StoreBaseUrl} from '../../constants'
import { useParams } from 'react-router-dom'

function StoreView() {
 const [theme, setTheme] = useState('aqua')
 const [storeData, setStoreData] = useState({
   'store_name':'',
   'contact':'',
   'license':'',
   'products':[]
})

const [params, setParams] = useState({
   'shop_owner_username':"",
   'division_name':"",
   'store_name':""
})



const getAllParams=()=>{
   const parameters = new URLSearchParams(window.location.search)
   setParams({
      shop_owner_username:parameters.get('shop_owner_username'),
      division_name:parameters.get('division-name'),
      store_name:parameters.get('store_name')
   })
}

 const getProducts =async()=>{
      await axios.get(StoreBaseUrl + 'store/product?shop_owner_username=amal&division_name=main hall&store_name=malabar').then((res)=>{
      console.log(res.data)
      setStoreData({...storeData, products:res.data})
   }).catch((e)=>{
   })
  
}
const search =async(keyword)=>{
   if (keyword != null){
      await axios.get(StoreBaseUrl + `store/product?+{ params.shop_owner_username + params.store_name + params.division_name}+&search=${keyword}`).then((res)=>{

      console.log("searching...")
      setStoreData({...storeData, products:res.data})

      }).catch((e)=>{
      })
   }
   
  
}

const getStoreData = async()=>{
  await axios.get(StoreBaseUrl + params.shop_owner_username + params.store_name + params.division_name ).then((res)=>{
   setStoreData(res.data)
  }) 
}

const loadStore = ()=>{
   getAllParams()
   getStoreData()
}

 useEffect(()=>{
   loadStore()
   //  getProducts()
 },[])

  return (
    <div>
        {theme === 'aqua'?<Aqua data = {storeData} search = {search}/>:""}
        {theme === 'darker'?<Darker data={storeData}/>:""}
    </div>
  )
}

export default StoreView
