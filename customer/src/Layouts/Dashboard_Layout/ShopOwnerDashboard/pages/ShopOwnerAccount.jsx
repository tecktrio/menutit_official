import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StoreBaseUrl } from '../../../../constants';

function ShopOwnerAccount() {
    const [profileData, setProfileData] = useState({})
    const getprofile = async () => {
        axios 
          .get(StoreBaseUrl + "user/profile", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setProfileData(res.data);
            // dispatch(res.data)
            // dispatchEvent.setStores(res);
          })
          .catch((e) => {
            console.log(e);
          });
      };
    
      useEffect(()=>{getprofile()},[])
  return (
    <div className='m-4'>
      <p className='text-2xl font-bold'>hello {profileData.username}</p>
      <p className='text-xs'>Here you can update your profile informations like profile image, contat number, email and all the account informations of yours.</p>
      <div className="mt-10">
      <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Username
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    name="store_name"
                    value={profileData.username}
                    // value={store_name}
                    // onChange={(e) => setStoreFormData({...storeFormData, store_name:e.target.value})}
                    />
            <div class="">
              <div class="">
                <div class="">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Email Id
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    name="store_name"
                    value={profileData.email}
                    // value={store_name}
                    // onChange={(e) => setStoreFormData({...storeFormData, store_name:e.target.value})}
                    />
                  <p class="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p>
                </div>
                <div class="">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Contact Number
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name="store_license_number"
                    value={profileData.contact}
                    // value={store_licence_number}
                    // onChange={(e) =>  setStoreFormData({...storeFormData, store_licence_number:e.target.value})}

                  />
                </div>{" "}
                <div class="">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    User Type
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name="store_image_url"
                    value={profileData.type}
                    // value={store_image_ur}
                    // onChange={(e)=>{ setStoreFormData({...storeFormData, store_image_url:e.target.value})}}
                  />
                </div>
                
               </div>
             

            </div>
          </div>
    </div>
  )
}

export default ShopOwnerAccount
