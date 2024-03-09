import React from 'react';
import style from './CategoriesSlider.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
const CategoriesSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000
    };
     function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
  let {data}=  useQuery('categories',getCategories)
    return <>
     <div className="row mt-3 w-90 mx-auto cursor-pointer">
     <Slider {...settings}>
            {data?.data.data.map(category=><div key={category._id} className='col-md-2 '>
                <div className="image">
                    <img src={category.image} alt="" className='w-100' height={300}/>
                    <p>{category.name}</p>
                </div>
            </div>)}
            </Slider>
     </div>
    </>
}

export default CategoriesSlider;
