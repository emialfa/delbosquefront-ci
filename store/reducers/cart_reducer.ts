import { AnyAction } from 'redux'
import { IProduct } from '../../types/product'
import { GET_ALL_CART, ADD_TO_CART, REMOVE_ONE_TO_CART, REMOVE_TO_CART } from '../constants'
import { saveLocal } from '../../services/cart'

const INITIAL_STATE = {
    cart: [],
    cantProducts: 0,
    subtotal: 0,
    shippingCost: 0, 
    zip: '',
    city: '',
    total: 0
}

const cartReducer = (state = INITIAL_STATE, action: AnyAction) => {
    let newCart:IProduct[] = []
    let cant:number = 0;
    let price;
    let newState;
    let subtotal:number;
    let check;
    switch (action.type) {
        case GET_ALL_CART:
            return { ...state, ...action.cart}
        case ADD_TO_CART:
            check= false;
            newCart = [...state.cart]
            price = action.product.price;
            newCart.forEach((item,indice)=>{
                if(item._id===action.product._id){
                    newCart[indice].quantity++;
                    check=true;
                }
            });
            if (!check) {
                action.product.quantity = 1;
                newCart.push(action.product);
            }
            subtotal = 0;
            newCart.forEach(item => subtotal += item.price * item.quantity)
            newState = {...state, cart: newCart, cantProducts: state.cantProducts+1, subtotal: subtotal, total: subtotal + state.shippingCost};
            saveLocal(newState, action.token)
            return newState; 
        case REMOVE_ONE_TO_CART:
            newCart = [...state.cart]
            newCart.forEach((item,indice)=>{
                if(item._id===action.product._id){
                    newCart[indice].quantity--;
                    price=action.product.price;
                    if(newCart[indice].quantity === 0){
                        newCart.splice(indice, 1);
                    }
                }
            });
            subtotal = 0;
            newCart.forEach(item => subtotal += item.price * item.quantity)
            newState= {...state, cart: newCart, cantProducts: state.cantProducts-1, subtotal: subtotal, total: subtotal + state.shippingCost}
            saveLocal(newState, action.token)
            return newState; 
        case REMOVE_TO_CART:
            newCart = [...state.cart]
            newCart.forEach((prod, indice) => { 
                if (prod._id === action.product._id) {
                    cant=prod.quantity;
                    price=action.product.price;
                    newCart.splice(indice, 1);
                }
            });
            subtotal = 0;
            newCart.forEach(item => subtotal += item.price * item.quantity)
            newState = {...state, cart: newCart, cantProducts: state.cantProducts-cant, subtotal: subtotal, total: subtotal + state.shippingCost};
            saveLocal(newState, action.token)
            return newState; 
        case 'EMPTY_CART':
            newState = {...state,  
                cart: [],
                cantProducts: 0,
                subtotal: 0,
                shippingCost: 0, 
                total: 0 }
            saveLocal(newState,action.token)
            return newState; 
        case 'ADD_SHIPPING':
            saveLocal({...state, shippingCost: action.cost, zip: action.zip, city: action.city, total: state.total + action.cost - state.shippingCost}, action.token)
            return ({...state, shippingCost: action.cost, zip: action.zip, city: action.city, total: state.total + action.cost - state.shippingCost})
        default:
            return state;
    }
}

export default cartReducer;