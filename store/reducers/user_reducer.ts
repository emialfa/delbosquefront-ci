import { AnyAction } from "redux";
import {SET_LOCAL_USER, LOGIN, LOGOUT} from "../constants"

const INITIAL_STATE = {
    user: null,
    isAdmin: false,
    shippingAddress: {},
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case SET_LOCAL_USER:
            return {
                ...state, user: action.user, isAdmin: action.isAdmin
            };
        case LOGIN:
            return {
                ...state, user: action.user, isAdmin: action.isAdmin
            };
        case LOGOUT:
            return {
                ...state, user: action.user, isAdmin: action.isAdmin
            };
        case 'ADD_SHIPPING_ADDRESS':
            return {
                ...state, shippingAddress: action.shippingAddress
            }
        default:
            return state;
    }
}