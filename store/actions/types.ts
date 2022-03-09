import { getAllTypes } from '../../services/types'
import { GET_ALL_TYPES} from "../constants";
import { AppDispatch } from '..';

const allTypes = (types: any) => ({
  type: GET_ALL_TYPES,
  types,
});

export const initTypes = () => (dispatch: AppDispatch ) => {
    getAllTypes()
    .then(res => dispatch(allTypes(res)));
}
