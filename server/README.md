### API Documentation
Here you will get all the informations about the menuit api. I will explain all the endpoints that we use and how to get access to the data from the server Hosted in AWS.

Response Codes Used 
--------------
```
200 ok
```
```
404 Not Found
```
```
500 Server Side Error
```
```
422 Submitted Data is Not enough
```
```
409 Already Exist
```
```
401 Unauthorized
```

<!-- 
<img src="https://tse1.mm.bing.net/th?id=OIP.jTh6w60UX70yL_DWQc0RJAHaES&pid=Api&P=0&h=180" alt="Alt text" width="500"> -->

Users Or Peorsanas
---------
- shopowner
- menuitadmin
- customer

Base Url for API
---------------

```
https://menuit.widecity.in/api
```

Endpoints Related to Both Shopowner and Admin needs an JWT Token to get data from server. You will get this token when you sign in using a Shopowner or Admin Account Credentials.

Use JWT with the request for getting access to the data. You can use Header with 'Authorization' key and and 'Token <access_key>' as the value.

<b>Header Example</b>
```
{
   Authorization : Token <access_key>
}
```


User Logins
----------
Most of the platforms use levels to identify different peorsanas. Here we have one api's for handling the authentication of both shopowner and menuitadmin users.

customers No need to login for the access.

Login/Register api url for shopowner/ menuitadmin
```
https://menuit.widecity.in/api/user
```
You will automaticaly redirect to the dashboards based on the user type.

JWT payload data
----------------
JWT contains Three parts. They are , Header, payload, Signature. Payload will contain user data that are required for authorisation. 

JWT expiration is set to 10 minute. 

Login or Register as user
-------------------
Hit at '/user/login or /user/register url for user' with the data keys to Login
```
{
   email : '',
   password  : ''
}
```
- If Login is successfull, it will respond with status 200. 
- If credentials are Wrong, response will be with status 404 and the reason.

User Profile
-----------
Hit at /user/profile with the Access Token in the headers you will get the profile data for the signed in user.

Hit at 'Login / Register url for shop_owner' with the data keys to Register
```
{
   username   : '',
   password   : '',
   email      : '',
   contact    : ''

}
```
- If Registration is successfull, it will respond with status 200. 
- If credentials are Wrong, response will be with status 404 and the reason.




## <b>Products</b>

   You can do all the CRUD Operations on Products through this API Endpoint.
```
https://menuit.in/api/products
```
### | Request Method <b>GET</b>

Parameters Required

```shop_owner_username```
```store_name```
```division_name```

Optional Parameters for <b>Filtering</b>

```category```
```price```

### | Request Method POST

Paramenters Required

```shop_owner_username```
```store_name```
```division_name```

Data Required

```product_name```
```product_price```
```product_category```
```product_description```
```product_image_url```
```product_unique_id```
```product_division_id```

### | Request Method PUT

You have to update the product using the structure below
```
{
   key : value
}
```
key - it should the the field name that you are trying to update\
value - it should be the value for that field

Paramenters Required

```shop_owner_username```
```store_name```
```division_name```

Updates can be done on the following fields

```product_name```
```product_price```
```product_category```
```product_description```
```product_image_url```
```product_unique_id```
```product_division_id```

### | Request Method DELETE


Paramenters Required

```shop_owner_username```
```store_name```
```division_name```
```product_id```


## <b>Categories</b>

   You can do all the CRUD Operations on Categories through this API Endpoint.
```
https://menuit.in/api/categories
```

<b>Stores</b>

   You can do all the CRUD Operations on Stores through this API Endpoint.
```
https://menuit.in/api/stores
```
<b>Shop Owners</b>

   You can do all the CRUD Operations on Shop Owners through this API Endpoint.
```
https://menuit.widecity.in/api/shop_owners
```
<b>Users</b>

   You can do all the CRUD Operations on user through this API Endpoint.
```
https://menuit.in/api/user
```
<b>Division</b>

   You can do all the CRUD Operations on Division through this API Endpoint.
```
https://menuit.in/api/division
```