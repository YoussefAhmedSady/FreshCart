import React, { useContext, useEffect, useState } from 'react';
import style from './Navbar.module.css'
import logo from '../../Assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/Context';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';




const Navbar = () => {
let {userToken,setUserToken}=useContext(UserContext)
let navigate=useNavigate()
function LogOut() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/Login')
}
let {getItems,count}= useContext(CartContext)
useEffect(()=>{getItems()
},[])
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div className="container">
        <Link className="navbar-brand" to={'/'}><img src={logo} alt="" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
        {userToken!=null?<>
            {/* <li className="nav-item">
            <NavLink className="nav-link" to={'/'}>Home {count}</NavLink>
            </li> */}
           
            <li className="nav-item">
            <NavLink className="nav-link" to={'products'}>Products</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to={'categories'}>Categories</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to={'brands'}>Brands</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to={'wishlist'}>WishList</NavLink>
            </li>
        </>:''}
        </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5 d-flex justify-content-center align-items-center">
            <li className="nav-item">
                    <i className="fa-brands fa-instagram me-2"></i>
                    <i className="fa-brands fa-facebook me-2"></i>
                    <i className="fa-brands fa-twitter me-2"></i>
                    <i className="fa-brands fa-linkedin me-2"></i>
                    <i className="fa-brands fa-youtube me-2"></i>
                    <i className="fa-brands fa-tiktok me-2"></i>
            </li>
            {userToken!=null?<>
                <li className="nav-item">
            <NavLink className="nav-link" to={'cart'}><i className="fa-solid fa-cart-shopping position-relative fs-2"><div className="alart1">{count}</div></i></NavLink>
            </li>
            <li className="nav-item">
            <span className="nav-link cursor-pointer" onClick={LogOut} >Logout<i className="fa-solid fa-right-from-bracket ms-1 "></i></span>
            </li>
            </>:<>
            <li className="nav-item">
            <NavLink className="nav-link" to={'Login'}>Login</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to={'Register'}>Register</NavLink>
            </li>
            </>}
            
        </ul>
        </div>
    </div>
    </nav>
    </>
}

export default Navbar;
