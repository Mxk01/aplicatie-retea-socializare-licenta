import React from 'react'
import './Register.css'
import {Link,useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'
function Register() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues : {
      profileAvatar:'',
      email:'',
      username:'',
      password:''
    },
    onSubmit: async(values)=>{
      

      let dateForma = new FormData();
      for(let value in values){
        // adaugam field-urile form-ului 
        // de forma  'photoUrl':'http://localhost:5000/whatever 
        dateForma.append(value,values[value]);
      }
      try {
        if(values.password.length<4  || values.password.length>10){
          alert('Parola trebuie sa fie intre 4 si 10 caractere!')
          return;
        }
        if(values.username.length==0){
          return;
        }
       let registeredUser = await axios.post('api/user/create-user',dateForma)
        navigate('/');
        navigate(0);
      }
      catch(e){

      }
    }
  })
  let changeImage = (e) => {
     formik.setFieldValue('profileAvatar',e.currentTarget.files[0])
  }
  return (
    <div className="register__container">
        
 
    <div className='register__image'>

    </div>

   <form className='register__form' onSubmit={formik.handleSubmit}  encType="multipart/form-data"> 
   <h1 className='register__message'>Register and chat with us!</h1>

   <div className='register__fields'> 
   <div className="mb-6">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
        <input type="text" id="username" 
         name='username'
         onChange={formik.handleChange}
         value={formik.values.username}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
    </div> 
   <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email  </label>
            <input type="email"
             required
             name='email'
             onChange={formik.handleChange}
             value={formik.values.email}
            id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@email.com" />
        </div>

        <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload file</label>
<input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" 
name="profileAvatar" 
accept='image/*'

onChange={(e)=>{ 
  changeImage(e) 
   
}}/>

        </div>
        <div className='mb-6'>
            <label htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Password </label>
            <input type="text"
             name='password'
             onChange={formik.handleChange}
             value={formik.values.password}
            id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
        </div>
        <div className="mb-6">
        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm password</label>
        <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required/>
        
  
    
    </div> 

   
    
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    <Link to="/">  <span className=" text-sm font-medium text-blue-900 dark:text-gray-300 mt-5">Don't have an account?</span></Link>

        <div>
    </div>
 
    {/* <button type="submit" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-orange-500 dark:focus:ring-blue-800">Submit</button> */}
    

    </div>
     </form>
   </div>
  )
}

export default Register