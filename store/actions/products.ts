import { getAll } from '../../services/products'
import { GET_ALL_PRODUCTS } from "../constants";
import { AppDispatch } from '..';
import { IProduct } from '../../types/product';

const allProducts = (products: IProduct[]) => ({
  type: GET_ALL_PRODUCTS,
  products,
});

export const initProducts = () => (dispatch: AppDispatch) => {
  getAll()
    .then(res => dispatch(allProducts(res)))
    .catch(err => console.log(err))
}



