import React from 'react';
import style from './Footer.module.css'
import img1 from '../../Assets/images/img2.png'
import img2 from '../../Assets/images/img3.png'
const Footer = () => {
    return <>
    <div className=" mx-auto p-5 light1">
    <h2>Get the freshCartapp</h2>
    <p className='fs-4'>we will send a link,open to your phone to download the app</p>
    <div className="row align-items-center justify-content-center">
        <div className="col-md-10">
            <input type="text" placeholder='Email' className='iup' />
        </div>
        <div className="col-md-2">
            <button className='btn bg-main p-3 rounded-2 text-white fs-5 fw-bold'>Share App Link</button>
        </div>
        <div className="row m-0 p-0 justify-content-between align-items-center">
            <div className="col-md-4 mt-2">
            <img src={img1} alt="payments" className='w-100' />
            </div>
            <div className="col-md-4 mt-2">
            <img src={img2} alt="payments" className='w-100' />
            </div>
        </div>
    </div>
    </div>
    </>
}

export default Footer;
