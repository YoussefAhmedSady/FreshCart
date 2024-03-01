import React, { useContext, useEffect, useState } from 'react';
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import Slider from "react-slick";
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';

const ProductDetails = () => {
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
      getItems()
      if(data.status=='success'){
        toast.success(data.message,{duration:2000})
        setcount(data.numOfCartItems)
      }else{
        toast.error(data.message,{duration:2000})
      }}
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1000
      };
      
    const [Details, setDetails] = useState({});
    const [Loading, setLoading] = useState(true);
    let {id}=useParams()
    async function getProductDetails(id) {
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setDetails(data.data)
        setLoading(false)
        getItems()
    }
    async function postToWishList(productId) {
      let {data}=await addToWishList(productId)
      if(data.status=='success'){
        toast.success(data.message,{duration:2000,icon:<i className="fa-solid fa-heart text-danger fa-3x"></i>})
      }else{
        toast.error(data.message,{duration:2000})
      }
    }
    let {getWishItem,addToWishList}= useContext(WishListContext)
    const [Check, setCheck] = useState([]);
    async function getItems() {
      let {data}=await getWishItem()
      setCheck(data?.data.map((id)=>{
        return id._id
      }))
  
  }
  function test(id){
    if(Check.includes(id)){
    return  <i className="fa-solid fa-heart fs-2 text-danger"></i>
    }else{
      return <i className="fa-solid fa-heart fs-2"></i>
    }
   }
    useEffect(()=>{getProductDetails(id)},[])
    return <>
    {Loading==true?<div className='d-flex justify-content-center align-items-center vh-100 '>
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
    <div className="row d-flex justify-content-center align-items-center p-4">
        <div className="col-md-4">
        <Slider {...settings}>
            {Details.images.map((image,index)=><img src={image} alt={Details.title} className='w-100 p-5' key={index}/>)}
    </Slider>
        </div>
        <div className="col-md-8">
        <div className=" p-2 rounded-4"  >
        <h3 className='h5 py-2 fw-bold'>{Details.title}</h3>
        <p>{Details.description}</p>
        <span className='text-main fw-bold font-sm'>{Details.category.name}</span>
        <div className="d-flex justify-content-between align-items-center py-2 fw-bold">
        <span className='font-sm'>{Details.price} EGP</span>
        <span className='' onClick={()=>{postToWishList(Details._id)}}> {test(Details.id)}</span>
        <span><i className='fas fa-star rating-color me-1'></i>{Details.ratingsAverage}</span>
        </div>
        <button className='btn bg-main w-100 text-white ' onClick={()=>{PostToCart(Details._id)}}>AddToCart</button>
        </div>
        </div>
    </div>
    </>}
    </>
}

export default ProductDetails;
