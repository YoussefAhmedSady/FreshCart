import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import { date } from 'yup';

const Products = () => {
    let {setcount}= useContext(CartContext)
    function getProducts() {
      return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }
    let {data,isFetching,isLoading,isError}=useQuery('featuredProducts',getProducts,{
      cacheTime:3000,
      staleTime:500
    })  
    let {addToCart}= useContext(CartContext)

  async function PostToCart(id) {
    let {data}=await addToCart(id)
    if(data.status=='success'){
      toast.success(data.message,{duration:2000})
      setcount(data.numOfCartItems)
    
    }else{
      toast.error(data.message,{duration:2000})
    }
  }
  let {addToWishList,getWishItem}= useContext(WishListContext)
  async function postToWishList(productId) {
    let {data}=await addToWishList(productId)
    if(data.status=='success'){
      toast.success(data.message,{duration:2000,icon:<i className="fa-solid fa-heart text-danger fa-3x"></i>})
    }else{
      toast.error(data.message,{duration:2000})
    }
  }
  const [Check, setCheck] = useState([]);
  async function getItems() {
    let {data}=await getWishItem()
    setCheck(data?.data.map((id)=>{
      return id._id
    }))

}
function test(id){
  if(Check?.includes(id)){
  return  <i className="fa-solid fa-heart fs-2 text-danger"></i>
  }else{
    return <i className="fa-solid fa-heart fs-2"></i>
  }
 }
useEffect(()=>{getItems()})

      return <>
      <h2>Featured Product</h2>
      {isLoading==true?<div className='loading'>
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
      </div>:<>
    <div className="row  p-4">
      {data?.data.data.map(product=>
          <div className="col-lg-2" key={product._id}>
        <div className="product p-2 cursor-pointer rounded-4"  >
        <Link to={`/ProductDetails/${product._id}`}>
          <img src={product.imageCover} alt={product.title} className='w-100 rounded-4' />
          <span className='text-main fw-bold font-sm'>{product.category.name}</span>
          <h3 className='h5 py-2 fw-bold'>{product.title.split(' ').splice(0,2).join(' ')}</h3>
          <div className="d-flex justify-content-between align-items-center py-2 fw-bold">
          <span className='font-sm'>{product.price} EGP</span>
          <span><i className='fas fa-star rating-color me-1'></i>{product.ratingsAverage}</span>
          </div></Link>
          <span className='' onClick={()=>{postToWishList(product._id)}}> {test(product._id)}</span>
          <button className='btn bg-main w-100 text-white ' onClick={()=>{PostToCart(product._id)}}>AddToCart</button>
          </div>
        
          </div>
      )}
    </div>
    </>}
      </>
}

export default Products;
