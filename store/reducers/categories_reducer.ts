import { AnyAction } from "redux";
import { GET_ALL_CATEGORIES } from "../constants";


const categoriesReducer = (state = [], action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};
export default categoriesReducer;