import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useRevalidator } from 'react-router-dom'
import { StoreBaseUrl } from '../constants'
import { Rating } from '@mui/material'
import StarIcon from "@mui/icons-material/Star";


function ShopList() {

    const navigate = useNavigate()

    const search = async (keyword = "") => {
        const id = 0
        if (keyword != null) {
          await axios
            .get(
              StoreBaseUrl + `store/storemanage?search=${keyword}`
            )
            .then((res) => {           
                 setShopData(res.data)
            })
            .catch((e) => {});
        }
      };
    
    const gotoStore=async(id)=>{
        // localStorage.setItem('store_id',id)
        // await axios.get(StoreBaseUrl + 'store/storemanage?store_id='+id).then(async(res)=>{
        //    console.log('data for the store',res.data)
        navigate(`store?store_id=${id}`)
    
        // })
    }

    const [shopData, setShopData] = useState([])

    const getStores = ()=>{
        axios.get(StoreBaseUrl + 'store/allstore').then((res)=>{
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
        <input placeholder='search' onKeyUp={(e)=>search(e.target.value)} className='border border-gray-300 rounded-md p-4 w-full my-3 '/>
        <div className='md:flex'>

        {shopData.map(shop=>{
            return (
                <div  onClick={()=>gotoStore(shop.id)} className='border border-gray-300 p-3 m-1 rounded-md cursor-pointer flex text-xs   '>
               <img src={shop.store_image_url} className='w-28 rounded-md'/>
               <div className='ml-2'>
               <p className='text-sm '>{shop.store_name}</p>

                <div className='text-sm '>{shop.store_license_number}</div>
                <p className='text-xs text-gray-500 w-full text-wrap'>{shop.store_desription}</p>
                
                <p className="text-xs flex">
                  {/* <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  > */}
                    <Rating
                      name="hover-feedback"
                      value={shop.store_rating}
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                        //   fontSize=""
                        />
                      }
                    />
                  {/* </Box> */}
                </p>  
                <p>Opens days        {shop.store_open_dates}</p>

                </div> 
                </div>
     
            )
        })}
                </div>

    </div>
  )
}

export default ShopList
