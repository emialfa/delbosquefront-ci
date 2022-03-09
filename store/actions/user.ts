import { AppDispatch } from ".."
import { userLogout } from "../../services/users"
import {SET_LOCAL_USER, LOGIN, LOGOUT} from "../constants"

export const loginStart = (user: any) => (dispatch: AppDispatch) => {
    dispatch({type: SET_LOCAL_USER, user})
}


export const userShippingAddress = (shippingAddress: object) => (dispatch: AppDispatch) => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))
    dispatch({type: 'ADD_SHIPPING_ADDRESS', shippingAddress: shippingAddress})
}

export const login = (user: any, isAdmin: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: LOGIN,
        user,
        isAdmin
    })
}

export const logout = (token:string) => (dispatch: AppDispatch) => {
    userLogout(token).then(
        res => {
            localStorage.setItem("logout", `${Date.now()}`);
            localStorage.removeItem('cart');
            localStorage.removeItem('likes')
            dispatch({type: LOGOUT, user:null, isAdmin: false})
        }
    )
}