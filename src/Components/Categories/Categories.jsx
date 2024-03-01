import React, { useEffect } from 'react';
import style from './Categories.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
const Categories = () => {
    const [SubCategory, setSubCategory] = useState([]);
    const [loading, setloading] = useState(true);
    const [categories, setcategories] = useState([]);
    async function getCategories() {
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setcategories(data.data)
    setloading(false)
    }
useEffect(()=>{getCategories()},[])
    async  function getSubCategories(categoryId) {
        setloading(true)
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
        setSubCategory(data.data)
        setloading(false)
      }  
    
    return <>
{loading==true?<div className='loading'>
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
            </div>:<div className="w-90 mx-auto py-5 mt-5">
            <div className="row g-5">
            {categories.map((category,index)=> <div className="col-md-4" key={index}>
                    <div className="category text-center shadow1 cursor-pointer position-relative" onClick={()=>{getSubCategories(category._id)}}>
                        <img src={category.image} alt="" className='w-100' height={400}/>
                        <div className="words p-3 "> <h3 className=' fs-3 text-main fw-bolder'>{category.name}</h3></div>
                    </div>
                </div>)}
            </div>
            <h3 className='text-center text-main fs-2 fw-bolder mt-3'>SuperMarket subcategories</h3>
      <div className="row mt-5 g-5">
        {SubCategory.map((supcate,index)=><div className="col-md-4" key={index}>
            <div className="subcategory word2">
                <h3>{supcate.name}</h3>
            </div>
        </div>)}
      </div>
            </div>
            

    }
    </>
}

export default Categories;

//    