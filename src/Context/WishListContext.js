import axios from "axios";
import { createContext, useContext, useState } from "react";

export let WishListContext= createContext()
export default function WishContextProvider(props) {
    const [Love, setLove] = useState(false);
    let headers={token:localStorage.getItem('userToken')}
    function addToWishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId
        },{
            headers
        })   
        .then((respones)=>respones)
        .catch((err)=>err)
    }
    function getWishItem() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers
        })   
        .then((respones)=>respones)
        .catch((err)=>err)
    }
    function deleteWishItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers
        })
        .then((respones)=>respones)
        .catch((err)=>err)
    }
    return <WishListContext.Provider value={{addToWishList,getWishItem,deleteWishItem}}>
        {props.children}
    </WishListContext.Provider>
}