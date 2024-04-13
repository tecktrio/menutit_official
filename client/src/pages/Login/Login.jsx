import React, { useState } from 'react'
import Loading from '../../components/Loading';

function Login() {

  const [CredentialState,setCredialState] = useState('username')

  const [loginCredentials, setLoginCredentials] = useState({
    'username':"",
    'password':""
  })

  


  return (
    <div className='flex justify-center items-center h-screen'>
      <section className='sm:border sm:border-gray-700 sm:p-20 rounded-md  w-screen  sm:w-3/4 flex-wrap sm:flex'>
        <section id='logo' className=' flex justify-center w-screen sm:w-1/2'>
          <img src='/menuit-logo.jpg' className='h-36'/>
        </section>
        <section id='inputs' className='w-screen flex justify-center mt-5 sm:w-1/2  '>
          
          {CredentialState == 'username'?
        
          <div className='w-3/4  sm:w-full ' id='usernameDiv'>
              <p className='font-semibold'>Username / Email ID</p>
              <p className='text-sm text-gray-600'>Enter your email id that you have used at the time of your registration</p>
              <input type='text' className='border usernameInput mt-5 border-gray-600 p-2 w-full rounded-md' id='username'/>
              <div className='mx-2 flex justify-end cursor-pointer'  >
                <div onClick={(e)=>{  setLoginCredentials({...loginCredentials ,username:document.getElementById('username').value});setCredialState('password')}} className='p-2 mt-2 bg-green-700 text-white rounded-md'>Next</div>
              </div>
            </div>
  
          :CredentialState == "password"?
            <div className='w-3/4  sm:w-full '  id='passwordDiv'>
              <p className='font-semibold'>Password</p>
              <p className='text-sm text-gray-600'>Enter your email id that you have used at the time of your registration</p>
              <input type='text' className='border usernameInput mt-5 border-gray-600 p-2 w-full rounded-md' id='password'/>
              <div className='mx-2 flex justify-end cursor-pointer'  >
                <div onClick={(e)=>{  setLoginCredentials({...loginCredentials ,password:document.getElementById('password').value});;setCredialState('username')}} className='p-2 mt-2 bg-green-700 text-white rounded-md m-3'>Previous</div>
                <div onClick={(e)=>{  setLoginCredentials({...loginCredentials ,password:document.getElementById('password').value});;setCredialState('verify')}} className='p-2 mt-2 bg-green-700 text-white rounded-md m-3'>Login</div>
                {/* <div onClick={(e)=>{  setLoginCredentials({...loginCredentials ,password:document.getElementById('password').value});;setCredialState('verify')}} className='p-2 mt-2 bg-green-700 text-white rounded-md'>Login</div> */}
              </div>          
              </div> 
            :CredentialState == "verify"?
            <Loading/>
            :
            <p>wait...</p>

            }
            
          
        </section>
      </section>
    </div>
  )
}

export default Login
