import axios from "axios";
import {URL_API} from '../store/constants'
import { IOrder } from "../types/order";
import { IProduct } from "../types/product";

export const saveOneOrder = async (form:any, token:string) =>{
    try{
        const res = await axios.post(URL_API +'orders', form, {headers: { Authorization : `Bearer ${token}`}})
        return res.data; 
    } catch (err) {
        throw err;
    }
}
export const getOrders = async (token:string) =>{
    try{
        const res = await axios.get(URL_API +'orders/all' , {headers: { Authorization : `Bearer ${token}`}})
        return res.data; 
    } catch (err) {
        throw err;
    }
}

export const updateOrder = async (form:any, token: string) => { 
    try{
        const res = await axios.put(URL_API +'orders/mpprefenceid', form, {headers:{ Authorization : `Bearer ${token}`}})
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const updateOneOrder = async (id:string, form:any, token:string) =>{
    try{
        const res = await axios.put(URL_API +'orders/'+ id, form, {headers: { Authorization : `Bearer ${token}`}})
        return res.data; 
    } catch (err) {
        throw err;
    }
}

export const getAdminOrders = async (token:string) =>{
    try{
        const res = await axios.get(URL_API +'orders/admin/all' , {headers: { Authorization : `Bearer ${token}`}})
        return res.data; 
    } catch (err) {
        throw err;
    }
}

export const getOneOrder = async (id:string, token:string) =>{
    try{
        const res = await axios.get(URL_API +'orders/single/'+id , {headers: { Authorization : `Bearer ${token}`}})
        return res.data; 
    } catch (err) {
        throw err;
    }
}

export const getAdminOneOrder = async (id:string, token:string) =>{
    try{
        const res = await axios.get(URL_API +'orders/admin/single/'+id , {headers: { Authorization : `Bearer ${token}`}})
        return res.data; 
    } catch (err) {
        throw err;
    }
}
export const getMPStatus = async (path:string) =>{
    try{
        const res = await axios.get(URL_API + 'orders/feedback' + path)
        return res.data; 
    } catch (err) {
        throw err;
    }
}

export const sendOrderFromWhatsapp = (cart?: IProduct[], subtotal?: number, shippingCost?:number, total?:number, shippingAddress?: any, street?: string) => {
    let productsList= '';
    cart?.map((p:IProduct) => productsList += `${p.name}\n"${p.category}"\n${p.quantity} x $${p.price}\n`)
    productsList += `\nSubtotal $${subtotal}\nCosto de envío $${shippingCost}\nTotal $${total}\n\n`
    productsList += `Datos de envío:\n\n Nombre: ${shippingAddress.name}\n Dirección: ${street}\n Localidad: ${shippingAddress.city}\n Cod Postal: ${shippingAddress.zip}\n Teléfono: ${shippingAddress.phone}\n Documento: ${shippingAddress.document}\n Email: ${shippingAddress.email}\n`
    const buyText = '¡Hola! Quisiera acordar el pago para mi compra de:\n\n' + productsList + '\n¡Muchas gracias!'
    window.open("https://api.whatsapp.com/send?phone=%2B5492914730027&text=" + encodeURIComponent(buyText), '_blank', 'noopener')
}