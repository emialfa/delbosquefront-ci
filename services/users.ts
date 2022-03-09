import axios from 'axios'
import {URL_API} from '../store/constants'

export const userRegister = async (form:any) =>{
    try{
        const res = await axios.post(URL_API + "users/register", form)
        return res.data;   
    } catch(err) {
        throw err;
    }
}

export const userConfirmRegister = async (token:string) =>{
    try{
        const res = await axios.post(URL_API + "users/confirm", {email: 'none'}, {headers: { Authorization : `Bearer ${token}`}})
        return res.data;   
    } catch(err) {
        throw err;
    }
}

export const userEmailConfirm = async (token:string) =>{
    try{
        const res = await axios.post(URL_API + "users/emailconfirm", {}, {headers: { Authorization : `Bearer ${token}`}})
        return res.data;   
    } catch(err) {
        throw err;
    }
}

export const userEmailResetPassword = async (form:any) =>{
    try{
        const res = await axios.post(URL_API + "users/emailresetpassword", form)
        return res.data;   
    } catch(err) {
        throw err;
    }
}
export const userRegisterGoogle = async (form:any) => {
    try{
        const res = await axios.post(URL_API + "users/register/googleAuth", form)
        return res.data;
    } catch(err) {
        throw err;
    }
}


export const userLogin = async (form:any) => {
    try{
        const res= await axios.post(URL_API +"users/login", form, { withCredentials: true})
        return res.data;
    } catch(err) {
        throw err;
    }
}

export const userLoginGoogle = async (form:any) => {
    try{
        const res= await axios.post(URL_API + "users/login/googleAuth", form)
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const userLoginFacebook = async (form:any) => {
    try{
        const res= await axios.post(URL_API + "users/login/facebookAuth", form)
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const getProfile = async (token:string) =>{
    try{
        const res = await axios.get(URL_API + "users", {headers: { Authorization : `Bearer ${token}`}})
        return res.data[0]; 
    } catch (err) {
        throw err;
    }
}
export const userLogout = async (token:string) => {
    try{
        const res = await axios.get(URL_API + "users/logout", { withCredentials: true, headers: { Authorization : `Bearer ${token}`}})
        return res.data; 
    } catch (err) {
        throw err;
    }
}
export const userUpdate = async (form:any, token: string) =>{
    try{
    const res= await axios.put(URL_API + "users/update", form, {headers: { Authorization : `Bearer ${token}`}});
    return res.data; 
} catch (err) {
    throw err;
}
}

export const userChangePassword = async (form:any, token:string) =>{
    try{
    const res = await axios.put(URL_API + "users/changepassword", form, {headers: { Authorization : `Bearer ${token}`}});
    return res.data; 
    } catch (err) {
        throw err;
    }
}

export const userDelete = async (path:string, token:string) =>{
    try {
        const res= await axios.delete(URL_API + "users/" + path, {headers: { Authorization : `Bearer ${token}`}});
        return res.data; 
    } catch (err) {
        throw err;
    }
}

export const userRefreshToken = async () => {
    try {
        const res = await axios.post(URL_API + "users/refreshToken",{}, {withCredentials: true})
        return res;
    } catch (err) {
        throw err;
    }
}