import { getAllCategories } from '../../services/categories'
import { GET_ALL_CATEGORIES } from "../constants";
import { AppDispatch } from '..';

const allCategories = (categories:any) => ({
  type: GET_ALL_CATEGORIES,
  categories,
});

export const initCategories = () => (dispatch: AppDispatch) => {
    getAllCategories()
    .then(res => dispatch(allCategories(res)));
}
