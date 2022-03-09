import axios from "axios";
import {URL_API} from '../store/constants'

export const saveLikesLocal = (likes:string[], token:string|null) =>{
    localStorage.setItem('likes', JSON.stringify(likes));
    if (token){
        axios.post(URL_API + 'favorites', {favorites: likes}, {headers: { Authorization : `Bearer ${token}`}})
    }
}

export const getUserLikes = async (token:string) => {
    const res = await axios.get(URL_API + 'favorites', {headers: { Authorization : `Bearer ${token}`}});
    return res.data.favorites;
}

