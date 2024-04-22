import axios from "axios";
import React, { useEffect, useState } from "react";
import { StoreBaseUrl } from "../../../constants";
import { SideBar } from "./SideBar";
import { NavuBar } from "./NavuBar";
import { AllShopes } from "./pages/AllShopes";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaStoreSolid } from "react-icons/lia";
import { VscAccount } from "react-icons/vsc";

function ShopOwnerDashboard(props) {
  const [stores, setStores] = useState([]);
  const [page, setPage] = useState("dashboard");

  const getProducts = async () => {
    axios
      .get(StoreBaseUrl + "store/product", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStores(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-blue-950  text-gray-50">
        <h1>MenuIt Dashboard</h1>
        <div className="pt-24 pl-7">
          <div
            className="flex items-center cursor-pointer pb-5"
            onClick={() => setPage("dashboard")}
          >
            <LuLayoutDashboard />
            <p className="pl-3">Dashboard</p>
          </div>
          <div
            className="flex items-center cursor-pointer pb-5"
            onClick={() => setPage("stores")}
          >
            <LiaStoreSolid />
            <p className="pl-3">Stores</p>
          </div>
          <div
            className="flex items-center cursor-pointer pb-5"
            onClick={() => setPage("account")}
          >
            <VscAccount />
            <p className="pl-3">Account</p>
          </div>
        </div>
      </div>
      <div className="h-full">
        {page === "stores" ? (
          <AllShopes />
        ) : page === "account" ? (
          "account"
        ) : page === "dashboard" ? (
          "dashboard"
        ) : (
          "select one"
        )}
      </div>
    </div>
  );
}

export default ShopOwnerDashboard;
