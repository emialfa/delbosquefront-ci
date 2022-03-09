import axios from 'axios'
import {URL_API} from '../store/constants'

export const getAllTypes = async () =>{
        const res = await axios.get(URL_API + "types");
       
        return res.data; 
}