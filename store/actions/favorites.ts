import { INIT_LOCAL_FAVORITES } from "../constants";
import { getUserLikes } from '../../services/likes'
import type { AppDispatch } from '../index'

const init = (likes: string[]) => ({
        type: INIT_LOCAL_FAVORITES, 
        likes,
})

const initUser = (likes:string[]) => ({
    type: 'INIT_USER_FAVORITES',
    likes,
})

const update = (id:string, user:string) => ({
    type: 'UPDATE_FAVORITES',
    id, user
})
export const initLocalFavorites = () => (dispatch: AppDispatch) => {
        const likes = JSON.parse(localStorage.likes);
        dispatch(init(likes))   
}

export const initUserFavorites = (token:string) => (dispatch: AppDispatch) => {
    getUserLikes(token)
        .then(res => dispatch(initUser(res)))
        .catch(err => null)
}

export const UpdateFavorites = (id:string, user:string) => (dispatch: AppDispatch) => {
    dispatch(update(id, user))   
}