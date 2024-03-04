import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";

export let CartContext= createContext()
export default function CartContextProvider(props) {
    
    function addToCart(productId) {
        let headers={token:localStorage.getItem('userToken')}
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId
        },{
            headers
        })
        .then((respones)=>respones)
        .catch((err)=>err)
    }
    function getCartItem() {
        let headers={token:localStorage.getItem('userToken')}
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers
        })
        .then((respones)=>respones)
        .catch((err)=>err)
    }
    const [count, setcount] = useState(0);
    const [cartItenms, setcartItenms] = useState(null);
    async function getItems() {
        let {data}=await getCartItem()
        setcartItenms(data)
    }
 
    function deleteCartItem(productId) {
        let headers={token:localStorage.getItem('userToken')}
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        })
        .then((respones)=>respones)
        .catch((err)=>err)
    }
    function updateCartItem(productId,count) {
        let headers={token:localStorage.getItem('userToken')}
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count
        },
        {
            headers
        })
        .then((respones)=>respones)
        .catch((err)=>err)
    }
     
    function checkOutSession(cartId,shippingAddress) {
        let headers={token:localStorage.getItem('userToken')}
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
            shippingAddress
        },{
            headers
        })
        .then((respones)=>respones)
        .catch((err)=>err)
    }

    return <CartContext.Provider value={{addToCart,getCartItem,deleteCartItem,updateCartItem,getItems,count,setcount,checkOutSession}}>
        {props.children}
    </CartContext.Provider>
}