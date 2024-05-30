import axios from "axios";
import React, { useEffect, useState } from "react";
import { StoreBaseUrl } from "../../constants";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Aqua = (props) => {
  const [page, setPage] = useState("division_list");
  const [divisions, setDivisions] = useState([]);
  const [products, setProducts] = useState([]);
  const [copied, setCopied] = useState(false);

  const { protocol, hostname, port } = window.location;
  const rootUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`;

  const parameters = new URLSearchParams(window.location.search);
  let store_id = parameters.get("store_id");

  const search = async (keyword = "") => {
    const id = 0
    if (keyword != null) {
      await axios
        .get(
          StoreBaseUrl + `store/storemanage?search=${keyword}`
        )
        .then((res) => {           
            //  setShopData(res.data)
        })
        .catch((e) => {});
    }
  };

  const Fdivision = async () => {
    setPage("");

    console.log("sending request  ");
    await axios
      .get(StoreBaseUrl + `store/division?store_id=${store_id}`)
      .then((res) => {
        setDivisions(res.data);
        setPage("division_list");
      })
      .catch((e) => {});
  };

  const setPage_to_productList = async (division_id) => {
    setPage("");

    await axios
      .get(
        StoreBaseUrl +
          `store/product?store_id=${store_id}&division_id=${division_id}`
      )
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);

        setPage("product_list");
      })
      .catch((e) => {});
  };
  const setPage_to_productView = async (id) => {
    setPage("");

    await axios
      .get(StoreBaseUrl + `store/product?store_id=${store_id}&product_id=${id}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);

        setPage("product_view");
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (parameters.has("division_id")) {
      let division_id = parameters.get("division_id");
      setPage_to_productList(division_id);
    } else if (parameters.has("product_id")) {
      let product_id = parameters.get("product_id");
      setPage_to_productView(product_id);
    } else {
      Fdivision();
    }
    setCopied(false)
  }, []);

  return (
    <div className="overflow-y-hidden ">
      <div
        id="top_banner"
        style={{
          // backgroundImage: "url(" + props.storeinfo.store_image_url + ")",
          backgroundImage: "url(store_banner.jpg)",
        }}
        className="p-10  text-white w-screen "
      >
        <p className="text-4xl">
          {props.storeinfo.store_name}
          <p className="text-sm">Store Name</p>

          {/* <p>Contact Detail {props.storeinfo.store_license_number}</p> */}
          <p>{props.storeinfo.store_license_number}</p>
          <p className="text-sm">License Number</p>
        </p>
        <p id="description">{props.storeinfo.store_desription}</p>
      </div>
      {page == "product_list" ? (
        <>

          <div className="p-3 w-screen">
          <input placeholder='search' onKeyUp={(e)=>search(e.target.value)} className='border border-gray-300 rounded-md p-4 w-full my-3'/>

<div  className="md:flex ">

            {products.map((product, index) => {
              return (
                <div
                  className="border border-gray-300 rounded p-1 cursor-pointer flex m-2 md:w-1/3"
                  onClick={() => setPage_to_productView(product.id)}
                >
                  <div className="m-2 ">
                    <img
                      src={product.product_image_url}
                      className=" rounded-md w-full "
                    />
                  </div>
                  <div className=" m-2 w-2/3 overflow-hidden">
                    <p>{product.product_name}</p>
                    <p className="text-xs text-gray-600 overflow-hidden h-18">
                      {product.product_description}
                    </p>
                  
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
                      value={product.product_rating}
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  {/* </Box> */}
                </p>  
                    {/* <p className='text-sm text-gray-600'>{product.product_store}</p> */}
                    <p className="text-red-700 font-bold">Rs. {product.product_price}</p>
                    <p className="text-sm text-gray-600">
                      Stock {product.product_available}
                    </p>
                  </div>
                </div>
              );
            })}
            </div>

          </div>
        </>
      ) : page == "category_list" ? (
        <div></div>
      ) : page == "division_list" ? (
        <div className="m-4">
          <input placeholder='search' onKeyUp={(e)=>search(e.target.value)} className='border border-gray-300 rounded-md p-4 w-full my-3'/>
          <div className="yyyyy">
            <CopyToClipboard text={rootUrl + `/store?store_id=${store_id}`}>
              {copied ? (
                <button
                  onClick={() => setCopied(true)}
                  className=" border border-gray-500 border-dashed p-3 rounded-lg text-gray-500"
                >
                  Copied!
                </button>
              ) : (
                <button onClick={() => setCopied(true)} className="border border-gray-500 border-dashed p-3 rounded-lg text-gray-500">Copy Store Link</button>
              )}
            </CopyToClipboard>
          </div>

          <div className="md:flex">
            {divisions.length > 0 ? (
              divisions.map((division, index) => {
                return (
                  <div
                    className="border border-gray-500 rounded p-9 cursor-pointer m-2"
                    onClick={() => setPage_to_productList(division.id)}
                  >
                    {division.division_name}
                  </div>
                );
              })
            ) : (
              <p>Store is Empty</p>
            )}
          </div>
        </div>
      ) : page == "product_view" ? (
        <>
          <div className="m-5">
            <div className="flex h-28">
              <img
                src={products.product_image_url}
                className="w-28  rounded-md"
              />
              <div className="ml-5 ">
                <p className="text-xs text-gray-600 underline">Product Name</p>
                <p>{products.product_name}</p>
                <p className="mt-2 flex text-xs">
                  Price{" "}
                  <p className="text-red-700 font-bold ml-2">
                    {" "}
                    Rs.{products.product_price}
                  </p>
                </p>
                <p className="text-xs">
                  Rating {products.product_rating}
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="hover-feedback"
                      value={products.product_rating}
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </Box>
                </p>

                <p className="text-sm text-gray-600">
                  Stock Available {products.product_available}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xs text-gray-600 underline mt-2">
                Description
              </p>
              <p className="text-sm ">{products.product_description}</p>
            </div>
            <div className=" ">
              <CopyToClipboard
                text={
                  rootUrl +
                  `/store?store_id=${store_id}&product_id=${products.id}`
                }
              >
                {copied ? (
                  <button
                    onClick={() => setCopied(true)}
                    className="border border-gray-500 border-dashed p-2 my-3 rounded-lg text-gray-500"
                  >
                    Copied!
                  </button>
                ) : (
                  <button onClick={() => setCopied(true)} className="border border-gray-500 border-dashed p-2 my-3 rounded-lg text-gray-500">
                    Copy Share Link
                  </button>
                )}
              </CopyToClipboard>
            </div>
          </div>
        </>
      ) : (
        <div className="flex text-black align-middle ">Loading</div>
      )}
    </div>
  );
};

export default Aqua;
