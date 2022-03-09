import { AnyAction } from "redux";
import { GET_ALL_TYPES } from "../constants";


const typesReducer = (state = [], action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_TYPES:
      return action.types;
    default:
      return state;
  }
};
export default typesReducer;