import React, { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { LiaStoreSolid } from "react-icons/lia";
import { Axios } from "axios";
import { StoreBaseUrl } from "../../../constants";




export const SideBar = () => {


    // useEffect(() => {
    //     getStores();
    //   }, []);

   
  return (
    <div className="w-1/5 ">
      <div id="sidebar" className="bg-blue-950 w-full h-screen">
        <div className="pl-7 pt-5 flex items-center"> {/* Add the 'flex' class */}
          <LuLayoutDashboard color="white"/>
          <p className="text-gray-50 pl-3">Dashboard</p>  {/* Adjust padding for spacing */}
        </div>
        <div className="pl-7 pt-5 flex items-center"> {/* Add the 'flex' class */}
          <LiaStoreSolid color="white"/>
          <p className="text-gray-50 pl-3" >Stores</p>  {/* Adjust padding for spacing */}
        </div>
        <div className="pl-7 pt-5 flex items-center"> {/* Add the 'flex' class */}
          <VscAccount color="white"/>
          <p className="text-gray-50 pl-3">Account</p>  {/* Adjust padding for spacing */}
        </div>
      </div>
      <div id="window" className=""></div>
    </div>
  );
};
