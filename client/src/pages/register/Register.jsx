import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import axios from 'axios';
import { StoreBaseUrl } from '../../constants';
import { useNavigate } from 'react-router-dom';
function Registration() {
  const navigate = useNavigate()
  const [CredentialState,setCredialState] = useState({'state':'username'})

  const [loginCredentials, setLoginCredentials] = useState({
    'username':"",
    'password':"",
    'contact':"",
    'username':"",
    'repassword':""
  })




  const RegistrationAttempt = async()=>{

  if (loginCredentials.password === loginCredentials.repassword){
    axios.post(StoreBaseUrl + 'user/register',{
      "email":loginCredentials.username,
      "password":loginCredentials.password,
      "contact":loginCredentials.contact,
      "username":loginCredentials.username,
     }).then((res)=>{
      if('token' in res.data){
        console.log('login succesful')
        // setCookie('token',res.data.token)
        localStorage.setItem('token',res.data.token)
        navigate('/Dashboard')
      }
      else if(res.status === 409){
        navigate('/login')
      }
     }).catch((err)=>{
      console.log(err)
     })
  }
  else{
    console.log('password do not match')
  }


  }
  

  const saveUsername=(e)=>{
    setLoginCredentials({...loginCredentials, username:e.target.value})
    // console.log(loginCredentials)
  }
  const savePassword=(e)=>{
    setLoginCredentials({...loginCredentials, password:e.target.value})
    // console.log(loginCredentials)
  }
  const saveRePassword=(e)=>{
    setLoginCredentials({...loginCredentials, repassword:e.target.value})
    // console.log(loginCredentials)
  }
  const saveEmailId=(e)=>{
    setLoginCredentials({...loginCredentials, email:e.target.value})
    // console.log(loginCredentials)
  }
  const saveContact=(e)=>{
    setLoginCredentials({...loginCredentials, contact:e.target.value})
    // console.log(loginCredentials)
  }

  const showPassword=(e)=>{
    setCredialState({...CredentialState, state:'password'})
    console.log('showing password')

  }
  const showUsername=(e)=>{
    setCredialState({...CredentialState, state:'username'})
    console.log('showing password')

  }


  return (
    <div className='flex justify-center items-center h-screen'>
      <section className='sm:border sm:border-gray-700 sm:p-20 rounded-md  w-screen  sm:w-3/4 flex-wrap sm:flex'>
        {/* <section id='logo' className=' flex justify-center w-screen sm:w-1/2'>
          <img src='/menuit-logo.jpg' className='h-36'/>
        </section> */}
        <section id='inputs' className='w-screen flex justify-center mt-5 sm:w-full  '>
          
          {CredentialState.state === 'username'?
        <div className='flex justify-between w-full'>
          <div className='mr-2'>
          <div className='w-3/4  sm:w-full ' id='usernameDiv'>
              <p className='font-semibold'>username</p>
              <p className='text-sm text-gray-600'>Enter your email id that you have used at the time of your registration</p>
              <input type='text' className='border usernameInput mt-5 border-gray-600 p-2 w-full rounded-md' id='username'  onChange={(e)=>saveUsername(e)} value={loginCredentials.username}/>
              {/* <div className='mx-2 flex justify-end cursor-pointer'  >
                <div onClick={showPassword} className='p-2 mt-2 bg-green-700 text-white rounded-md'>Next</div>
              </div> */}
            </div>
            <div className='w-3/4  sm:w-full' id='usernameDiv'>
              <p className='font-semibold'>Email Id</p>
              <p className='text-sm text-gray-600'>Enter your email id that you have used at the time of your registration</p>
              <input type='text' className='border usernameInput mt-5 border-gray-600 p-2 w-full rounded-md' id='username'  onChange={(e)=>saveEmailId(e)} value={loginCredentials.email}/>
              {/* <div className='mx-2 flex justify-end cursor-pointer'  >
                <div onClick={showPassword} className='p-2 mt-2 bg-green-700 text-white rounded-md'>Next</div>
              </div> */}
            </div>
          </div>
          <div>
          <div className='w-3/4  sm:w-full ' id='usernameDiv'>
              <p className='font-semibold'>Contact</p>
              <p className='text-sm text-gray-600'>Enter your email id that you have used at the time of your registration</p>
              <input type='text' className='border usernameInput mt-5 border-gray-600 p-2 w-full rounded-md' id='username'  onChange={(e)=>saveContact(e)} value={loginCredentials.contact}/>
              <div className='mx-2 flex justify-end cursor-pointer'  >
                <div onClick={showPassword} className='p-2 mt-2 bg-green-700 text-white rounded-md'>Next</div>
              </div>
            </div>
           
          </div>
         
  
        </div>
         
          :CredentialState.state === "password"?
          <div>
<div className='w-3/4  sm:w-full '  id='passwordDiv'>
              <p className='font-semibold'>Password</p>
              <p className='text-sm text-gray-600'>Enter your email id that you have used at the time of your registration</p>
              <input type='password' className='border usernameInput mt-5 border-gray-600 p-2 w-full rounded-md' id='password' value={loginCredentials.password}  onChange={(e)=>{ savePassword(e)}}/>
              {/* <div className='mx-2 flex justify-end cursor-pointer'  >
                <div onClick={showUsername} className='p-2 mt-2 bg-green-700 text-white rounded-md m-3'>Previous</div>
                <div onClick={()=>{RegistrationAttempt()}} className='p-2 mt-2 bg-green-700 text-white rounded-md m-3'>Login</div>
                <div onClick={(e)=>{  setLoginCredentials({...loginCredentials ,password:document.getElementById('password').value});;setCredialState('verify')}} className='p-2 mt-2 bg-green-700 text-white rounded-md'>Login</div> */}
              {/* </div>           */}
              </div> <div className='w-3/4  sm:w-full '  id='passwordDiv'>
              <p className='font-semibold'>Re-Enter Password</p>
              <p className='text-sm text-gray-600'>Enter your email id that you have used at the time of your registration</p>
              <input type='password' className='border usernameInput mt-5 border-gray-600 p-2 w-full rounded-md' id='password' value={loginCredentials.repassword}  onChange={(e)=>{ saveRePassword(e)}}/>
              <div className='mx-2 flex justify-end cursor-pointer'  >
                <div onClick={showUsername} className='p-2 mt-2 bg-green-700 text-white rounded-md m-3'>Back</div>
                <div onClick={()=>{RegistrationAttempt()}} className='p-2 mt-2 bg-green-700 text-white rounded-md m-3'>Register</div>
                {/* <div onClick={(e)=>{  setLoginCredentials({...loginCredentials ,password:document.getElementById('password').value});;setCredialState('verify')}} className='p-2 mt-2 bg-green-700 text-white rounded-md'>Login</div> */}
              </div>          
              </div> 
          </div>
            
            :CredentialState.state === "verify"?
            <Loading/>
            :
            <p>wait...</p>

            }
            
          
        </section>
      </section>
    </div>
  )
}

export default Registration
