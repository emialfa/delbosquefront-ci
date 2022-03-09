import axios from 'axios'
import {URL_API} from '../store/constants'


export const getAllCategories = async () =>{
        const res = await axios.get(URL_API + "categories");
       
        return res.data; 
}