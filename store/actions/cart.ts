import { AppDispatch } from '..'
import { IProduct } from '../../types/product'
import { GET_ALL_CART, ADD_TO_CART, REMOVE_ONE_TO_CART, REMOVE_TO_CART } from '../constants'
import { getUserCart } from '../../services/cart'

const AllCart = ( cart:any ) => ({
    type: GET_ALL_CART,
    cart
})


const AddToLocalCart = ( product:IProduct,  token:string ) => ({
    type: ADD_TO_CART,
    product,
    token
})

const RemoveOneToLocalCart = ( product:IProduct,  token:string ) => ({
    type: REMOVE_ONE_TO_CART,
    product,
    token
})

const RemoveToLocalCart = ( product:IProduct, token:string ) => ({
    type: REMOVE_TO_CART,
    product,
    token
})

const EmptyCart = (token:string) => ({
    type: 'EMPTY_CART'
})

const AddShipping = (cost:number, zip:number, city:string) => ({
    type: 'ADD_SHIPPING', 
    cost: cost,
    zip: zip,
    city: city
})


export const initLocalCart = () => (dispatch: AppDispatch) => {
    if (localStorage.cart) {
        const cart = JSON.parse(localStorage.cart);
        dispatch(AllCart(cart))
    }
    else {
        dispatch(AllCart({
            cart: [],
            cantProducts: 0,
            subtotal: 0,
            shippingCost: 0, 
            total: 0
        }))
    }
}

export const initUserCart = (token:string) => (dispatch: AppDispatch) => {
    getUserCart(token)
        .then(cart => dispatch(AllCart(cart)))
        .catch(err => null)
}

export const newLocalProduct = (product: IProduct, token:string) => (dispatch: AppDispatch) => {
    dispatch(AddToLocalCart(product, token))
}

export const removeLocalOneProduct = (product: IProduct, token:string) => (dispatch: AppDispatch) => {
    dispatch(RemoveOneToLocalCart(product, token))
}

export const removeLocalProduct = (product: IProduct, token:string) => (dispatch: AppDispatch) => {
    dispatch(RemoveToLocalCart(product, token))
}

export const emptyCart = (token:string) => (dispatch: AppDispatch) => {
    dispatch(EmptyCart(token))
}
export const addShipping = (cost: number, zip: number, city:string) => (dispatch: AppDispatch) => {
    dispatch(AddShipping(cost, zip, city))
}