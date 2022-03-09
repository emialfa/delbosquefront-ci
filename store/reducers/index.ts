import { combineReducers } from "redux";
import { userReducer } from "./user_reducer";
import categoriesReducer from "./categories_reducer";
import typesReducer from "./types_reducer";
import favoritesReducer from './favorites'
import cartReducer from "./cart_reducer";
import productsReducer from "./products_reducer"

export default combineReducers({
    categoriesReducer,
    userReducer, 
    typesReducer,
    favoritesReducer,
    cartReducer,
    productsReducer
});