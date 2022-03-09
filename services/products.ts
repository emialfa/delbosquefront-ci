import axios from 'axios'
import {URL_API} from '../store/constants'


export const getAll = async () =>{
        const res = await axios.get(URL_API +"products");
       
        return res.data; 
}

export const getOneProduct = async (path:string) => {
        try {
                const res = await axios.get(URL_API + "products/" + path);
                return res.data
        } catch (err) {
                throw err;
        }
}