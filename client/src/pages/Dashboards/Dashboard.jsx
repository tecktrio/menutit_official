import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StoreBaseUrl } from '../../constants'
import ShopOwnerDashboard from './ShopOwnerDashboard/ShopOwnerDashboard'
import MenuitDashboard from './MenuitDashboard/MenuitDashboard'

function Dashboard() {
    const [user, setUser] = useState({})
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token != null){
            // console.log(token)
            axios.get(StoreBaseUrl + 'user/profile',{
                'headers':
                {
                'Authorization':`Token ${token}`
            }
            }).then((res)=>{
                console.log(res.data)
                    setUser(res.data.data)
            }).catch((e)=>{
                console.log(e)
            })
        }
    },[])

    useEffect(()=>{
        console.log('user',user.type)
    }, [user])
    
  return (
    <div>
     {user.type === 'shopowner'?<ShopOwnerDashboard user={user}/>:user.type === 'menuitadmin'?<MenuitDashboard user = {user}/>:"something went wrong"}
    </div>
  )
}

export default Dashboard
