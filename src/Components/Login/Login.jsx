import React, { useContext, useState } from 'react';
import style from './Login.module.css'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
const Login = () => {
    let {setUserToken}= useContext(UserContext)
    let navigate=useNavigate()  
    const [laoding, setlaoding] = useState(false);
    const [apiErrore, setapiErrore] = useState(null);
    async function Loginsubmit(values) {
        setlaoding(true)
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .catch((err)=>{setapiErrore(err.response.data.message)
        setlaoding(false)})
        if(data.message=='success'){
            setlaoding(false)
            localStorage.setItem('userToken',data.token)
            setUserToken(data.token)
            navigate('/')
        }
    }
   async function forgetPassword() {
        navigate('/getemail')
    }
    let validationSchema=yup.object({
        email:yup.string().required('email is required').email('invalid email'),
        password:yup.string().required('password is required').matches(/^[A-Z][\w @]{5,8}$/,'invalid Password example Ahmed123'),
    })
    let formik=useFormik({
        initialValues:{
            email:"",
            password:"",
        },validationSchema
        ,onSubmit:Loginsubmit
    })
 
    return <>
    <div className="w-75 mx-auto py-4 mt-5" >
        <h2>Login Now</h2>
        {apiErrore?<div className="alert alert-danger">{apiErrore}</div>:''}
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email : </label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" placeholder='Enter your Email' id='email' name='email' className='form-control mb-3' />
        {formik.errors.email &&formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>:null}
        <label htmlFor="password">Password : </label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" placeholder='Enter your Password' id='password' name='password' className='form-control mb-3' />
        {formik.errors.password &&formik.touched.password?<div className="alert alert-danger py-2">{formik.errors.password}</div>:null}
        {laoding==true?<button  className='btn bg-main text-white fs-4 fw-bold' type='submit'> <Bars
height="30"
width="30"
color="#fff"
ariaLabel="bars-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/> </button>:
        <button disabled={!(formik.dirty &&formik.isValid)} className='btn bg-main text-white fs-4 fw-bold me-3' type='submit'>Login  </button>}
    <span>If you do not have an account please</span>   <Link to={'/register'} className=' text-main fs-4 ' >Register Now</Link>
    <div className=""><span className='text-main fs-4 cursor-pointer' onClick={()=>{forgetPassword()}}>Forget password</span></div>
        </form>
    </div>
    
    </>
}

export default Login;
