import React, { useContext } from 'react';
import style from './ShippingAddress.module.css'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
const ShippingAddress = () => {
  async  function checkout(values) {
    let {data}=await checkOutSession(cartId,values)
    console.log(data);
    if(data.status=='success'){
        console.log(data);
        window.location.href=data?.session.url
    }
    }
    let formik=useFormik({
        initialValues:{
            details: "",
            phone: "",
            city: ""
        },onSubmit:checkout
    })
    let {checkOutSession}=  useContext(CartContext)
    let {cartId}=useParams()
    return <>
   <div className="mt-5 py-5"> <h2>ShippingAddress</h2>
   <div className="w-90 mx-auto">
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">details</label>
        <input onChange={formik.handleChange} type="text" id='details' name='details' placeholder='address details' className='form-control mb-3' />
        <label htmlFor="phone">phone</label>
        <input onChange={formik.handleChange} type="text" id='phone' name='phone' placeholder='address phone' className='form-control mb-3' />
        <label htmlFor="city">city</label>
        <input onChange={formik.handleChange} type="text" id='city' name='city' placeholder='address city' className='form-control mb-3' />
        <button className='btn bg-main text-light' type='submit'>checkOut</button>
    </form>
   </div>
   </div>
    </>
}

export default ShippingAddress;
