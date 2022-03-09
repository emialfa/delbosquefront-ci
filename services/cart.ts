import axios from "axios"
import {URL_API} from '../store/constants'


export const saveLocal = (cart: any, token: string) =>{
    const newCart = JSON.stringify(cart)
    localStorage.setItem('cart', newCart)
    if (token){
        axios.post(URL_API + 'cart', {cart: newCart},  {headers:  { Authorization : `Bearer ${token}`}})
    }
}

export const getUserCart = async (token:string) =>{
    const res = await axios.get(URL_API + 'cart', {headers:  { Authorization : `Bearer ${token}`}})
    if(res.data.cart.length > 0){
        localStorage.setItem('cart', res.data.cart);
        const cart = JSON.parse(res.data.cart)
        return cart;
    }
}


export const getApiShippingCost = async (id:string) =>{
    try{
    const res = await axios.get(URL_API + 'sucursalesCA/' + id)
    return res.data
    } catch (err) {
        throw err;
    }  
}