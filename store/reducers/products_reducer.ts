import { AnyAction } from "redux";
import { GET_ALL_PRODUCTS } from "../constants";


const productsReducer = (state = [], action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
export default productsReducer;