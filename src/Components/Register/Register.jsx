    import React, { useState } from 'react';
    import style from './Register.module.css'
    import { useFormik } from 'formik';
    import * as yup from 'yup'
    import axios from 'axios';
    import { Bars } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
    const Register = () => {
        let navigate=useNavigate()  
        const [laoding, setlaoding] = useState(false);
        const [apiErrore, setapiErrore] = useState(null);
        async function Registersubmit(values) {
            setlaoding(true)
        let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
        .catch((err)=>{setapiErrore(err.response.data.message)
            setlaoding(false)})
            if(data.message=='success'){
                setlaoding(false)
                navigate('/Login')
            }
        }
        let validationSchema=yup.object({
            name:yup.string().required('Name is required').min(3,'minimum lenght 3').max(10,'maximum lenght 10'),
            email:yup.string().required('email is required').email('invalid email'),
            password:yup.string().required('password is required').matches(/^[A-Z][\w @]{5,8}$/,'invalid Password example Ahmed123'),
            rePassword:yup.string().required('rePassword is required').oneOf([yup.ref('password')],'password is not match'),
            phone:yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'must be an egyption number')
        })
        let formik=useFormik({
            initialValues:{
                name: "",
                email:"",
                password:"",
                rePassword:"",
                phone:""
            },validationSchema
            ,onSubmit:Registersubmit
        })
        return <>
        <div className="w-75 mx-auto py-4" >
            <h2>Register Now</h2>
            {apiErrore?<div className="alert alert-danger">{apiErrore}</div>:''}
            <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name : </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder='Enter your Name' id='name' name='name' className='form-control mb-3' />
            {formik.errors.name &&formik.touched.name?<div className="alert alert-danger py-2">{formik.errors.name}</div>:null}
            <label htmlFor="email">Email : </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" placeholder='Enter your Email' id='email' name='email' className='form-control mb-3' />
            {formik.errors.email &&formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>:null}
            <label htmlFor="password">Password : </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" placeholder='Enter your Password' id='password' name='password' className='form-control mb-3' />
            {formik.errors.password &&formik.touched.password?<div className="alert alert-danger py-2">{formik.errors.password}</div>:null}
            <label htmlFor="rePassword">rePassword : </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" placeholder='Enter your rePassword' id='rePassword' name='rePassword' className='form-control mb-3' />
            {formik.errors.rePassword &&formik.touched.rePassword?<div className="alert alert-danger py-2">{formik.errors.rePassword}</div>:null}
            <label htmlFor="phone">Phone : </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" placeholder='Enter your Phone' id='phone' name='phone' className='form-control mb-3' />
            {formik.errors.phone &&formik.touched.phone?<div className="alert alert-danger py-2">{formik.errors.phone   }</div>:null}
            {laoding==true?<button  className='btn bg-main text-white fs-4 fw-bold' type='submit'> <Bars
    height="30"
    width="30"
    color="#fff"
    ariaLabel="bars-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    /> </button>:
            <button disabled={!(formik.dirty &&formik.isValid)} className='btn bg-main text-white fs-4 fw-bold' type='submit'>Register  </button>}
            <Link to={'/login'} className='text-main fs-4  ms-3' >Login</Link>
            </form>
        </div>
        </>
    }

    export default Register;
