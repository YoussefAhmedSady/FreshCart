import React, { useState } from 'react';
import style from './ResetPassword.module.css'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Formik, useFormik } from 'formik';
import { Bars } from 'react-loader-spinner';
import * as yup from 'yup'

const ResetPassword = () => {
    let navigate=useNavigate()  
    const [laoding, setlaoding] = useState(false);
    async function ResetPassword(values) {
        setlaoding(true)
        let {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
        setlaoding(false)
        if(data.token){
            toast.success('Email and Password are update')
            navigate('/Login')
        }else{
            toast.error(data.message)
            setlaoding(false)
        }
    }
    let validationSchema=yup.object({
        email:yup.string().required('email is required').email('invalid email'),
        newPassword:yup.string().required('password is required').matches(/^[A-Z][\w @]{5,8}$/,'invalid Password example Ahmed123'),
    })
    let formik=useFormik({
        initialValues:{
            email:"",
            newPassword:"",
        },validationSchema
        ,onSubmit:ResetPassword
    })
    return <>
    <div className="w-75 mx-auto py-4 mt-5" >
        <h2>Reset Password</h2>  
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email : </label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" placeholder='Enter your Email' id='email' name='email' className='form-control mb-3' />
        {formik.errors.email &&formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>:null}
        <label htmlFor="newPassword">newPassword : </label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="newPassword" placeholder='Enter your newPassword' id='newPassword' name='newPassword' className='form-control mb-3' />
        {formik.errors.newPassword &&formik.touched.password?<div className="alert alert-danger py-2">{formik.errors.password}</div>:null}
        {laoding==true?<button  className='btn bg-main text-white fs-4 fw-bold' type='submit'> <Bars
height="30"
width="30"
color="#fff"
ariaLabel="bars-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/> </button>:
        <button disabled={!(formik.dirty &&formik.isValid)} className='btn bg-main text-white fs-4 fw-bold me-3' type='submit'>Reset</button>}
        </form>
    </div>
    </>
}

export default ResetPassword;
