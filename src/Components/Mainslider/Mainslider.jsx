import React from 'react';
import style from './Mainslider.module.css'
import imgslider1 from '../../Assets/images/slider-image-3.jpeg'
import imgslider2 from '../../Assets/images/slider-image-2.jpeg'
import imgslider3 from '../../Assets/images/slider-image-1.jpeg'
import img1 from '../../Assets/images/grocery-banner.png'
import img2 from '../../Assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick';
const Mainslider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000
    };
    return <>
    <div className="row g-0 w-90 mx-auto p-2 cursor-pointer">
        <div className="col-md-9">
            <Slider {...settings}>
                <img src={imgslider1} alt="" height={400} className='w-100'/>
                <img src={imgslider2} alt="" height={400} className='w-100'/>
                <img src={imgslider3} alt="" height={400} className='w-100'/>
            </Slider>
        </div>
        <div className="col-md-3">
            <img src={img1} alt="" className='w-100' height={200}/>
            <img src={img2} alt="" className='w-100' height={200}/>
        </div>
    </div>
    </>
}

export default Mainslider;
