import { AnyAction } from "redux";
import { INIT_LOCAL_FAVORITES } from "../constants";
import { saveLikesLocal } from '../../services/likes'

const favoritesReducer = (state = [], action: AnyAction) => {
    switch (action.type) {
      case INIT_LOCAL_FAVORITES:
        return action.likes;
      case 'INIT_USER_FAVORITES':
        return action.likes;
      case 'UPDATE_FAVORITES':
        const newArray:string[]=[...state]
        let indice = newArray.indexOf(action.id, 0);
        if( indice >= 0){
            newArray.splice(indice, 1)
        }
        else{
            newArray.push(action.id)
        }
        saveLikesLocal(newArray, action.user);
        return newArray;
      default:
        return state;
    }
  };

  export default favoritesReducer;