import React,{useState} from 'react'
import './Login.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Login() {
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let loginUser = async() => {

   let  loggedUser = await axios.post('api/user/login-user',{email,password})
   console.log(loggedUser);
   // check if status is 200 so everything is ok then stringify the result and store in localStorage
   // then simply can use the image after 
 }
  return (
    <div className="login__container">
 
    <div className='login__image'>

    </div>

   <div className='login__form'> 
   <h1 className='login__message'>Login and chat with us!</h1>

   <div className='login__fields'> 
   <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email  </label>
            <input type="text" 
            onChange={(e)=>{setEmail(e.target.value)}} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Password </label>
            <input onChange={(e)=>{setPassword(e.target.value)}} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
        </div>
        <Link to="/register">  <span className=" text-sm font-medium text-blue-900 dark:text-gray-300 mt-5">Don't have an account?</span>
        </Link>
        <div>
    </div>
 
    <button type="submit" className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-orange-500 dark:focus:ring-blue-800">Submit</button>
    

    </div>
     </div>
   </div>
  )
}

export default Login