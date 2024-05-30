import React, { useEffect, useState } from 'react'
import Aqua from '../Themes/Aqua/Aqua'
import axios from 'axios'
import { StoreBaseUrl } from '../constants'

function StoreView() {
 const [theme, setTheme] = useState('aqua')
 const [storeinfo, setStoreinfo] = useState({})

 const parameters = new URLSearchParams(window.location.search)
 const id= parameters.get('store_id')


const loadStore = async()=>{

   
   await axios.get(StoreBaseUrl + 'store/storemanage?store_id='+id).then(async(res)=>{
      console.log('data for the store',res.data)
      setStoreinfo(res.data)

   })


}

 useEffect(()=>{
   loadStore()
 },[])

  return (
    <div>
        {theme === 'aqua' ?<Aqua storeinfo = {storeinfo} />:""}
        {/* {theme === 'darker'?<Darker data={storeData}/>:""} */}
    </div>
  )
}

export default StoreView
