import React, { useContext, useEffect, useState } from 'react';
import style from './FeaturedProducts.module.css'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Mainslider from '../Mainslider/Mainslider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import Products from '../Products/Products';

const FeaturedProducts = () => {
    return <>
   <div className="mt-4">
   <h2>Featured Product</h2>
    <Mainslider/>
    <CategoriesSlider/>
    <Products/>
   </div>
  </>
}
export default FeaturedProducts;
