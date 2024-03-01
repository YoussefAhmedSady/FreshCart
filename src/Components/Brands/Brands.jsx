import React, { useEffect, useState } from 'react';
import style from './Brands.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
const Brands = () => {
    
    const [oneBrand, setoneBrand] = useState(null);
    const [brandLayout, setbrandLayout] = useState(false);
    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }
    let brands=useQuery('Brands',getBrands,{
        cacheTime:3000,
        staleTime:3000
    })
   async function getOneBrand(brandId) {
       let brand=await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
      setoneBrand(brand.data?.data)
      setbrandLayout(true)
    }
    return <>
    {brands.isLoading==true?<div className='loading'>
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
            </div>:  <div className="mt-5 py-5 w-90 mx-auto">
    <h2 className='text-center text-main fw-bold'>All Brands</h2>
    <div className="row">
    {brands.data?.data.data.map((brand,index)=>
         <div className="col-md-3 mt-2"key={index} onClick={()=>{getOneBrand(brand._id)}}>
         <div className="cart text-center">
             <img src={brand.image} alt=""  className='w-100'/>
             <h3>{brand.name}</h3>
         </div>
     </div>
    )}
    </div>
  {brandLayout==true?  <div className="position-fixed top-0 end-0 start-0 bottom-0 bg-blc overflow-hidden d-flex justify-content-center align-items-center lay">
    <div className="bg-light w-25 py-5 ">
        <div className="d-flex justify-content-end border-bottom p-1"><i className="fa-solid fa-x fa-2x me-3 cursor-pointer"onClick={()=>{setbrandLayout(false)}}></i></div>
        <div className="row justify-content-center align-items-center p-3 ">
            <div className="col-md-6 text-center">
                <h2 className='fs-1 fw-bolder text-main'>{oneBrand.name.toUpperCase()}</h2>
                <p className='fs-3'>{oneBrand.name.toLowerCase()}</p>
            </div>
            <div className="col-md-6">
                <img src={oneBrand.image} alt="" className='w-100' />
            </div>
        </div>
        <div className="d-flex justify-content-end border-top "><button className='btn btn-dark me-3 mt-3'onClick={()=>{setbrandLayout(false)}}>Close</button></div>
    </div>
    </div>:''}
    </div>
    }
  
    </>
}

export default Brands;
