import React, { useContext, useState } from 'react';
import style from './WishList.module.css'
import { useEffect } from 'react';
import { WishListContext } from '../../Context/WishListContext';
import { BallTriangle } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

const WishList = () => {
    let{getWishItem,deleteWishItem}=useContext(WishListContext)
    const [WishItenms, setWishItenms] = useState(null);
const [Loading, setLoading] = useState(true);
async function getItems() {
    let {data}=await getWishItem()
    setWishItenms(data)
    setLoading(false)
    
}
let {addToCart,setcount}= useContext(CartContext)

async function PostToCart(id) {
  let {data}=await addToCart(id)
  if(data.status=='success'){
    toast.success(data.message,{duration:2000})
    setcount(data.numOfCartItems)
  
  }else{
    toast.error(data.message,{duration:2000})
  }
}
async function deletWish(id) {
    let {data}=await deleteWishItem(id);
    getItems()
    if(data.status=='success'){
        toast.success(data.message,{duration:2000})
        setcount(data.numOfCartItems)
      
      }else{
        toast.error(data.message,{duration:2000})
      }
}
useEffect(()=>{getItems()},[])
    return <>
    <h2>wish</h2>
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
    </div>:<div className='bg-light p-5 mt-2 w-90 mx-auto mt-5 mb-5'>
        <h2 className='fw-bolder'>Shop wish</h2>
        {WishItenms.data.map((product,index)=><div className="row border-3 border-bottom align-items-center" key={index}>
            <div className="col-lg-2 m-2" >
                <img src={product.imageCover} alt='' className='w-100'/>
            </div>
            <div className="col-md-7">
                <div className="item">
                    <h3 className='h5 fw-bold'>{product.title.split(' ').splice(0,3).join(' ')}</h3>
                    <p className='text-main fw-bold'>{product.price}EGP</p>
                    <button className='btn' onClick={()=>{deletWish(product._id)}}><i className='fas fa-trash-can text-danger'></i>Remove</button>
                </div>
                </div>
                <div className="col-md-2">
                    <button className='btn bg-main p-2 text-white fs-5' onClick={()=>{PostToCart(product._id)}}>Add to cart</button>
                </div>
        </div>)}
        </div>}
        
        
        
    </>
}

export default WishList;
