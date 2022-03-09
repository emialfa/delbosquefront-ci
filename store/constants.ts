//URL
let url = 'https://delbosquebordados.com.ar/api/v1/'

if(process.env.NEXT_PUBLIC_APP_ENV === 'test') {
    url = 'https://delbosquebordados.com.ar/api/v1/test/'
} 

export const URL_API = url

// Products
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";

//Cart
export const GET_ALL_CART = "GET_ALL_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_TO_CART ="REMOVE_ONE_TO_CART";
export const REMOVE_TO_CART ="REMOVE_TO_CART";

//User
export const SET_LOCAL_USER = "SET_LOCAL_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

//Favorites
export const INIT_LOCAL_FAVORITES = 'INIT_LOCAL_FAVORITES'

//Categories
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

//Types
export const GET_ALL_TYPES = 'GET_ALL_TYPES'



