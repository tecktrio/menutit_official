import { Axios } from 'axios';
import React, { useState } from 'react'
import { StoreBaseUrl } from '../../../../constants';

export const AllShopes = () => {
    const [stores, setStores] = useState([]);

    const getStores = async () => {
        Axios
          .get(StoreBaseUrl + "user/stores", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setStores(res.data);
            // dispatch(res.data)
            dispatchEvent.setStores(res)
          })
          .catch((e) => {
            console.log(e);
          });
      };
  return (
    <div className='pl-24 pt-24'>AllShopes</div>
  )
}
