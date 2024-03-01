import './App.css';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Layout from './Components/Layout/Layout';
import { HashRouter, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import CounterContextProvider from './Context/Context';
import UserContextProvider, { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import NotFound from './Components/NotFound/NotFound';
import { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList';
import ShippingAddress from './Components/ShippingAddress/ShippingAddress';
import Allorders from './Components/Allorders/Allorders';
import GetEmail from './Components/GetEmail/GetEmail';
import ResetPassword from './Components/ResetPassword/ResetPassword';


function App() {
  let routes=createHashRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'cart/',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'products/',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'categories/',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'brands/',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'shippingaddress/:cartId',element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:'/allorders/',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
      {path:'wishlist/',element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'ProductDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'resetpassword/',element:<ResetPassword/>},
      {path:'register/',element:<Register/>},
      {path:'getemail/',element:<GetEmail/>},
      {path:'login/',element:<Login/>},
      {path:'*/',element:<NotFound/>},
    ]}
])
let {setUserToken}= useContext(UserContext)
useEffect(()=>{
  if(localStorage.getItem('userToken')){
    setUserToken(localStorage.getItem('userToken'))
  }
},[])
  return <>
      
      <CounterContextProvider>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster/>
      </CounterContextProvider>
      
  </>
}

export default App;
