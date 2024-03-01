import React, { useState } from 'react';
import style from './GetEmail.module.css'
import { useFormik } from 'formik';
import { Bars } from 'react-loader-spinner';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const GetEmail = () => {
    let navigate=useNavigate()  
    const [laoding, setlaoding] = useState(false);
    const [compare, setcompare] = useState(false);
    async function getVarifaction(values) {
        setlaoding(true)
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
        )
        if(data.statusMsg=='success'){
            toast.success(data.message,{duration:2000})
            setcompare(true)
          }else{
            toast.error(data.message,{duration:2000})
          }
          setlaoding(false)
    }
    let formi=useFormik({
        initialValues:{
            resetCode:"".toString()
        },onSubmit:compareCode
        
    })
    
    let formik=useFormik({
        initialValues:{
            email:""
        },onSubmit:getVarifaction
        
    })
    async function compareCode(values) {
        console.log(values);
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
        )
         setlaoding(true)
         setlaoding(false)
        if(data.status==='Success'){
            toast.success('success',{duration:2000})
            navigate('/resetpassword')
          }else{
            toast.error('invalid Number',{duration:2000})
          }
          
    }
    return <>
    <div className="w-75 mx-auto py-4 mt-5" >
    <h2>SetEmail</h2>
   {compare==false?     <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email : </label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder='Enter your Email' id='email' name='email' className='form-control mb-3' />
        {laoding==true?<button  className='btn bg-main text-white fs-4 fw-bold' type='submit'> <Bars
height="30"
width="30"
color="#fff"
ariaLabel="bars-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/> </button>:
        <button disabled={!(formik.dirty &&formik.isValid)} className='btn bg-main text-white fs-4 fw-bold me-3' type='submit'>GetVarifay</button>} 
        </form>:<div>
        <form onSubmit={formi.handleSubmit}>
        <label htmlFor="resetCode">resetCode : </label>
        <input onChange={formi.handleChange} onBlur={formi.handleBlur} type="text" placeholder='Enter your resetCode' id='resetCode' name='resetCode' className='form-control mb-3' />
        
        {laoding==true?<button  className='btn bg-main text-white fs-4 fw-bold' type='submit'> <Bars
height="30"
width="30"
color="#fff"
ariaLabel="bars-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/> </button>:
        <button disabled={!(formi.dirty &&formi.isValid)} className='btn bg-main text-white fs-4 fw-bold me-3' type='submit'>GetVarifay</button>} 
        </form>
            </div>}
    </div>
    </>
}

export default GetEmail;
