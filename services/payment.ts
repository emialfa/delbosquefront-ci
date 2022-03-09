import axios from "axios";
import {URL_API} from '../store/constants'

export const generateMPButton = async (form:any) =>{
    try{
        const res = await axios.post(URL_API + 'orders/payment', form)
        return res.data; 
    } catch (err) {
        throw err;
    }
}