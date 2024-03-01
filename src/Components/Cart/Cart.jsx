import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
const Cart = () => {
let{getCartItem,deleteCartItem,updateCartItem}=useContext(CartContext)
const [cartItenms, setcartItenms] = useState(null);
const [Loading, setLoading] = useState(true);
async function getItems() {
    let {data}=await getCartItem()
    if(data?.status=='success'){
    setcartItenms(data)
    setLoading(false)
    setcount(data.numOfCartItems)
    }else{
setLoading(false)
}}
const {setcount} = useContext(CartContext);
async function deleteItems(id) {
    setLoading(true)
    let {data}=await deleteCartItem(id) 
    setcartItenms(data)
    setLoading(false)
    setcount(data.numOfCartItems)
}
async function updatecount(id,count) {
  if(count<1){
    setLoading(true)
    let {data}=await deleteCartItem(id)
    setLoading(false)
    setcartItenms(data)
    setcount(data.numOfCartItems)
  }else{
    let {data}=await updateCartItem(id,count)
    setcount(data.numOfCartItems)
    setcartItenms(data)
  }
    setLoading(false)
}
useEffect(()=>{getItems()},[])
    return <>
    <h2>Cart</h2>
    {Loading==true?<div className='loading'>
    <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass="text-main"
  visible={true}
  />
    </div>:cartItenms?<div className='bg-light p-5 mt-2 w-90 mx-auto '>
        <h2 className='fw-bolder'>Shop Cart</h2>
        <h3 className='text-main fw-bolder h6'>Total price Items: <span className='mx-1'> {cartItenms.data.totalCartPrice} </span> EGP</h3>
        {cartItenms.data.products.map((product,index)=><div className="row border-3 border-bottom align-items-center" key={index}>
            <div className="col-lg-2 m-2" >
                <img src={product.product.imageCover} alt={product.product.title} className='w-100'/>
            </div>
            <div className="col-md-7">
                <div className="item">
                    <h3 className='h5 fw-bold'>{product.product.title.split(' ').splice(0,3).join(' ')}</h3>
                    <p className='text-main fw-bold'>{product.price}EGP</p>
                    <button className='btn' onClick={()=>{deleteItems(product.product.id)}}><i className='fas fa-trash-can text-danger'></i>Remove</button>
                </div>
                </div>
            <div className="col-md-2">
                <div className="count">
                    <button className='btn text-main fs-4 brdr' onClick={()=>{updatecount(product.product.id,product.count-1)}}>-</button>
                    <span className='fs-4 fw-bolder'>{product.count}</span>
                    <button className='btn text-main fs-4  brdr' onClick={()=>{updatecount(product.product.id,product.count+1)}}>+</button>
                </div>
            </div>
           
        </div>
        
        )}
         <Link to={`/shippingaddress/${cartItenms.data._id}`} className='btn bg-main text-light m-5 '>Online Payment</Link>
        </div>
        
        
       :<div className='mt-5 py-5 fs-1 fw-bolder text-center'>Cart is Empty</div> }
    </>
}

export default Cart;
