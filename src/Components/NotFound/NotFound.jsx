import React from 'react';
import style from './NotFound.module.css'
import img1 from '../../Assets/images/Screenshot 2024-02-26 215222.png'
const NotFound = () => {
    return <>
    <h2 className='text-center fs-1 text-main fw-bolder '>Page Not Found</h2>
    <div className="w-50 mx-auto py-3">
    <img src={img1} alt="NotFound" className='w-100' />
    </div>
    </>
}

export default NotFound;
