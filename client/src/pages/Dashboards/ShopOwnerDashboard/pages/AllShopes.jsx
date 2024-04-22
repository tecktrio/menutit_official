import axios from "axios";
import React, { useEffect, useState } from "react";
import { StoreBaseUrl } from "../../../../constants";
import { useNavigate } from "react-router-dom";

export const AllShopes = () => {

  const navigate = useNavigate()
  const [stores, setStores] = useState([]);
  //   view can contain 'stores, add_store, delete_store'
  const [view, setView] = useState("stores");
  const [storeFormData, setStoreFormData] = useState({
    "store_name":"",
  "store_licence_number":"",
  "store_description":"",
  "store_image_url":"",
  "store_open_dates":""
  })



  const getStores = async () => {
    axios
      .get(StoreBaseUrl + "user/stores", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStores(res.data);
        // dispatch(res.data)
        dispatchEvent.setStores(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createStore = () => {
    axios
      .post(StoreBaseUrl + "store/manage", storeFormData,{
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setView('stores')
        // setStores(res.data);
        // dispatch(res.data)
        // dispatchEvent.setStores(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const submitAddStoreForm = (e) => {
    createStore()
  };

  useEffect(() => {
    getStores();
  }, [view]);
  return (
    <>
      <div className="">
        {view === "stores" ? (

          <>
            <div className="flex justify-between p-5">
              <div>
                <p className="font-bold text-lg">Stores</p>
                <p className="text-sm text-gray-700">Listing all of your stores that are avaialble in your account.</p>
              </div>
            <button
              className=" bg-blue-950 text-white p-4 rounded"
              onClick={() => {
                setView("add_store");
              }}
            >
              add store
            </button>
            </div>

            <hr/>
            
          <div className=" pt-24 grid grid-cols-4 gap-5  m-4">
          
            {stores.length === 0 ? (
              <>no store found</>
            ) : (
              stores?.map((store, key) => {
                return (
                  <div
                    key={key}
                    className="max-w-sm w-full border border-gray-800 p-4  rounded col-span-1 overflow-hidden shadow-lg"
                  >
                    <img
                      className="w-full h-56"
                      src={store.store_image_url}
                      alt="store_image_ur"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        {store.store_name}
                      </div>
                      <p className="text-gray-700 text-base">
                        {store.store_desription}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {`Stor Rating  ${store.store_rating}`}
                      </span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {`More Details`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}

          </div>
          </>
        ) : view === "add_store" ? (
          <div className="pl-96 pt-24 ">
            <div className="my-6">
              <p className="fs-6 font-semibold">Add Store</p>
              <p className="text-sm text-gray-700">
                Fill the form with proper details and add your store to in your
                account in a secure way.
              </p>
            </div>
            <div class="w-full max-w-lg">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Store Name
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    name="store_name"
                    placeholder="store name"
                    // value={store_name}
                    onChange={(e) => setStoreFormData({...storeFormData, store_name:e.target.value})}
                    />
                  <p class="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    License Number
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name="store_license_number"
                    placeholder="licence number"
                    // value={store_licence_number}
                    onChange={(e) =>  setStoreFormData({...storeFormData, store_licence_number:e.target.value})}

                  />
                </div>{" "}
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Store Image Url
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name="store_image_url"
                    placeholder="url"
                    // value={store_image_ur}
                    onChange={(e)=>{ setStoreFormData({...storeFormData, store_image_url:e.target.value})}}
                  />
                </div>{" "}
                
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Open Dates
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="dates"
                    name="store_dates"
                    // value={store_open_dates}
                    onChange={(e)=>{ setStoreFormData({...storeFormData, store_open_dates:e.target.value})}}
                  />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Store Description
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="text"
                    placeholder="Type about your store...."
                    name="store_description"
                    // value={store_description}
                    onChange={(e)=>{ setStoreFormData({...storeFormData, store_description:e.target.value})}}
                  />
                  <p class="text-gray-600 text-xs italic">
                    Make it as long and as crazy as you'd like
                  </p>
                </div>
              </div>
             

              <div className="flex justify-end">
                {/* add store button */}
                <button
                  className="p-3 rounded-md bg-blue-500 text-white"
                  onClick={submitAddStoreForm}
                >
                  Add store
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>no view available </p>
        )}
        

      </div>

    </>
  );
};
