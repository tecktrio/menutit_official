import axios from "axios";
import React, { useEffect, useState } from "react";
import { StoreBaseUrl } from "../../constants";
import MenuitDashboard from "./MenuitDashboard/MenuitDashboard";
import { useNavigate } from "react-router-dom";
import ShopOwnerDashboard from "./ShopOwnerDashboard/ShopOwnerDashboard";

function Dashboard() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      // console.log(token)
      axios
        .get(StoreBaseUrl + "user/profile", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          setLoading(false)
        })
        .catch((e) => {
          console.log(e);
        });
    }
    else{
      navigate('/login')
    }
  }, []);

  useEffect(() => {
    console.log("user", user.type);
  }, [user]);

  return (
    <div>
      {!loading?
      <>
      {user.type === "shopowner" ? (
        <ShopOwnerDashboard user={user} />
      ) : user.type === "menuitadmin" ? (
        <MenuitDashboard user={user} />
      ) : (
        "something went wrong"
      )}
      </>:<>
      <div>loading</div>
      </>}

    </div>
  );
}

export default Dashboard;
