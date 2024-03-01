import React from 'react';
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";


const Layout = () => {
   
    return <>
    <Navbar/>
    <Outlet></Outlet>
    <Offline><div className='loading fs-2'>The internet is Offline please Check your connection <i className='fas fa-spinner fa-spin text-main'></i></div></Offline>
    <Footer></Footer>
    </>
}

export default Layout;
