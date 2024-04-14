import React from "react";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome"
// import { faGauge } from "@fortawesome/fa-gauge"; // Import specific 


export const SideBar = () => {
  return (
    <div className="w-1/5 bg-red-400">
      <div id="sidebar" className="bg-blue-950 w-full h-screen">
        <div className="pl-7 pt-5">
        {/* <FontAwesomeIcon icon={faGauge} />  */}

          <p className="text-gray-50 pb-3">Dashboard</p>
          <p className="text-gray-50 pb-3">Account</p>
          <p className="text-gray-50 pb-3">Stores</p>
        </div>
      </div>
      <div id="window" className=""></div>
    </div>
  );
};
