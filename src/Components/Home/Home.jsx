import React, { useContext } from 'react';
import style from './Home.module.css'
import { CounterContext } from '../../Context/Context';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

const Home = () => {
    return <>
    
    <FeaturedProducts/>
    </>
    
}

export default Home;
