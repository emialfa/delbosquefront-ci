import { createStore, applyMiddleware } from 'redux';
import combineReducers  from '../store/reducers/index'
import thunkMiddleware from 'redux-thunk'


export function createTestStore() {
    const store = createStore(
        combineReducers,       
        applyMiddleware(thunkMiddleware)
    );
    return store;
  }
