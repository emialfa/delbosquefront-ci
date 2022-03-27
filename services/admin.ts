import axios from 'axios'
import {URL_API} from '../store/constants'

export const adminLogin = async (form:{email:string, password:string}) => {
    try {
        const res= await axios.post(URL_API + "users/login", form)
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const getAllUsers = async (token:string) => {
    try {
        const res = await axios.get(URL_API + 'users/all', {headers:{Authorization : `Bearer ${token}`}})
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const getOneUser = async (id:string,token:string) => {
    try {
        const res = await axios.get(URL_API + 'users/' + id, {headers: {Authorization : `Bearer ${token}`}})
        return res.data;
    } catch (err) {
        throw err;
    }
}
export const getOneCategory = async (path:string) => {
    try {
        const res = await axios.get(URL_API +path);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const loadOneCategory = async (path:string, form:any, token:string) => {
    try {
        const res = await axios.post(URL_API + path , form , {headers: {Authorization : `Bearer ${token}`, "Content-Type":"multipart/form-data"}})
        return res;
    } catch (err) {
        throw err;
    }
} 

export const editOneCategory = async (path:string, form:any, token:string) => {
    try {
        const res = await axios.put(URL_API + path, form, {headers: {Authorization : `Bearer ${token}`, "Content-Type":"multipart/form-data"}})
        return res;
    } catch (err) {
        throw err;
    }
} 

export const deleteOneCategory = async (path:string, token: string) => {
    try {
        const res = await axios.delete(URL_API +path, {headers: {Authorization : `Bearer ${token}`}})
        return res;
    } catch (err) {
        throw err;
    }
} 

export const getProducts = async (path:string) => {
    try {
        const res = await axios.get(URL_API +'products/'+ path)
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const loadOneProduct= async (form:any, token:string) => {
    try {
        const res = await axios.post(URL_API + 'products/', form, {headers: {Authorization : `Bearer ${token}`, "Content-Type":"multipart/form-data"}})
        return res;
    } catch (err) {
        throw err;
    }
} 

export const editOneProduct = async (path:string, form:any, token: string) => {
    try {
        const res = await axios.put(URL_API +'products/'+path, form, {headers: {Authorization : `Bearer ${token}`, "Content-Type":"multipart/form-data"}})
        return res;
    } catch (err) {
        throw err;
    }
} 
export const deleteProduct = async (path:string, token:string) => {
    try {
        await axios.delete(URL_API +'products/'+path, {headers: {Authorization : `Bearer ${token}`}})
    } catch (err) {
        throw err;
    }
}

export const getUsersCount = async (token: string) => {
    try {
        const res = await axios.get(URL_API +'users/get/count', {headers: {Authorization : `Bearer ${token}`}});
        return res.data;
    } catch (err) {
        throw err;
    }
}


export const getUsersWeek = async (token: string) => {
    try {
        const res = await axios.get(URL_API +'users/get/week', {headers: {Authorization : `Bearer ${token}`}});
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const getOrdersCount = async (token: string) => {
    try {
        const res = await axios.get(URL_API +'orders/get/count', {headers: {Authorization : `Bearer ${token}`}});
        return res.data;
    } catch (err) {
        throw err;
    }
}


export const getOrdersWeek = async (token: string) => {
    try {
        const res = await axios.get(URL_API +'orders/get/week', {headers: {Authorization : `Bearer ${token}`}});
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const getOrdersday = async (token: string) => {
    try {
        const res = await axios.get(URL_API +'orders/get/day', {headers: {Authorization : `Bearer ${token}`}});
        return res.data;
    } catch (err) {
        throw err;
    }
}
export const getRevenues = async (token: string) => {
    try {
        const res = await axios.get(URL_API +'orders/get/revenues', {headers: {Authorization : `Bearer ${token}`}});
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const getSixMonths = async (token: string) => {
    try {
        const res = await axios.get(URL_API +'orders/get/sixmonths', {headers: {Authorization : `Bearer ${token}`}});
        return res.data;
    } catch (err) {
        throw err;
    }
}
