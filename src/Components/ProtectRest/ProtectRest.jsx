import React from 'react';
import style from './ProtectRest.module.css'
import { Navigate } from 'react-router-dom';
const ProtectRest = (props) => {
    if(localStorage.getItem('email')){
        return props.children 
        }else{
         return <Navigate to={'/Login'}/> 
        }
    
}

export default ProtectRest;
