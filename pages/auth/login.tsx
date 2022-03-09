import React, { FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Head from 'next/head'
import styled from 'styled-components'
import close from '../../public/assets/x.png'
import { login } from '../../store/actions/user'
import GoogleLogin from 'react-google-login';
import { userLogin, userLoginFacebook as userLoginFacebook, userLoginGoogle } from '../../services/users'
import { useRouter } from 'next/router'
import Products from '../../components/products'
import Layout from '../../components/layout'
import { getAll } from '../../services/products'
import { getAllCategories } from '../../services/categories'
import { getAllTypes } from '../../services/types'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { IProduct } from '../../types/product'
import { ICategory } from '../../types/categories'
import { IType } from '../../types/types'
import FacebookLogin from 'react-facebook-login';

const Container = styled.div<{hide: number}>`
    display: ${(props) => props.hide ? 'none' : 'block' };
`
const Background = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    background: rgba(196, 196, 196, 0.58);
    top: 0px;
    z-index: 1;
`

const Wrapper = styled.form`
    position:fixed;
    background: #99877D;
    box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
    border-radius: 23.7209px;
    top:50%;
    left:50%;
    display: flex;
    flex-direction: column; 
    align-items:center;
    padding: 2.8rem 3.25rem 2rem 3.25rem;    
    z-index: 2;
    transform: translate(-50%, -50%);
`

const Notification = styled.p`
    color: wheat;
    position: fixed;
    margin-top: -33px;
    width: 300px;
    text-align: center;
`

const InputWrapper = styled.div`
`

const Title = styled.div`
    font-style: normal; 
    font-weight: 800; 
    font-size: 17.1429px; 
    line-height: 21px;
    color: #FFFFFF;
    margin-bottom: 13px;
`

const Input = styled.input`
    background: #FFFFFF;
    border-radius: 20px; 
    width:235px;
    height:26px;
    border:0px;
    outline: none;
    text-indent: 20px;
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 15px;
    color: #000000;
`

const Submit = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background: #FFFFFF;
    border-radius: 30px;
    margin: 0rem 0px 1.5rem 0px;
    cursor: pointer;
    border: none;
    color: #99877D;

    &:hover {
        opacity: 0.7;
    }
`

const Button = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 13.9px;
    line-height: 17px;
    color: #FFFFFF;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`
const GoogleRegister = styled.button`
    border-radius: 30px;
    padding: 10px 17px;
    align-content: center;
    display: flex;
    margin-top: 1rem;
    border: none;
    background: url('https://developers-dot-devsite-v2-prod.appspot.com/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat;
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 21px;
    color: #99877D;
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 21px;
    background-color: white;
    justify-content: flex-end;
    place-content: flex-end;
    text-indent: 26px;
    white-space: nowrap;

    &:hover {
        opacity: 0.7;
    }
`

const Close = styled.div`
    top: 19px;
    right: 19px;
    position: absolute;
    cursor: pointer;
    z-index: 3;

    &:hover {
        opacity: 0.7;
    }
`
const Show = styled.img`
    position: absolute;
    right: 10px;
    top: 42px;
    display: flex;
    cursor: pointer;
    opacity: 0.7;

    &:hover{
        opacity: 0.5;
    }
`

const Login: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const dispatch = useDispatch()
    const [isFetching, setIsFetching] = useState(false);
    const [message, setMessage] = useState('');
    const [hide, setHide] = useState(false)

    const handleSubmit = async (e:FormEvent) => {
        try {
            e.preventDefault();
            setIsFetching(true)      
            const form = {
                email: email.current?.value,
                password: password.current?.value
            }
            const res = await userLogin(form)
            if(res.regtoken) return router.push('/auth/mailconfirm?regtoken='+ res.regtoken)
            setIsFetching(false)
            setHide(true)
            if (res.favorites.length > 0) localStorage.setItem('likes', JSON.stringify(res.favorites))
            if (res.cart.length > 0) localStorage.setItem('cart', res.cart)
            localStorage.setItem('first', 'first')
            dispatch(login(res.token, res.isAdmin))
            res && window.location.replace(window.location.origin)   
        } catch(err) {
            console.log(err)
            setIsFetching(false)
            setMessage("Datos incorrectos.")
            setTimeout(() => {
                setMessage("")
            }, 5000);
        }
    }

    const responseGoogle = async (response:any) => {
        try {
            setIsFetching(true)
            const form ={
                tokenId: response.tokenId,
                favorites: localStorage.likes ? JSON.parse(localStorage.likes) : [],
                cart: localStorage.cart ? localStorage.cart : '',
            }
            const res = await userLoginGoogle(form)
            res && setMessage('¡Ingreso exitoso!')
            setTimeout(() => {
                if (res.favorites.length > 0) {
                    localStorage.setItem('likes', JSON.stringify(res.favorites))
                }
                if (res.cart.length > 0) {
                    localStorage.setItem('cart', res.cart)
                }
                localStorage.setItem('first', 'first')
                dispatch(login(res.token, res.isAdmin))
                res && window.location.replace(window.location.origin)    
            }, 1000)
        } catch(err) {
            console.log(err)
            setIsFetching(false)
            setMessage("Algo falló...")
            setTimeout(() => {
                setMessage("")
            }, 5000);
        }
    }
    const responseFacebook = async (response: any) => {
        try {
            const {accessToken, userID} = response
            const form = {
                favorites: localStorage.likes ? JSON.parse(localStorage.likes) : [],
                cart: localStorage.cart ? localStorage.cart : '',
            }
            const res:any = await userLoginFacebook({accessToken, userID, ...form})
            res && setMessage('¡Ingreso exitoso!')
            setTimeout(()=> {
                if (res.favorites.length > 0) {
                    localStorage.setItem('likes', JSON.stringify(res.favorites))
                }
                if (res.cart.length > 0) {
                    localStorage.setItem('cart', res.cart)
                }
            localStorage.setItem('first', 'first')
            dispatch(login(res.token, res.isAdmin))
            res && window.location.replace(window.location.origin)  
        }, 1000)
        } catch (err) {
            setIsFetching(false)
            setMessage("Algo falló...")
            console.log(err)
            setTimeout(() => {
                setMessage("")
            }, 5000);
        }
    }
    const googleFailure = (err:any) => {
    }

    const handleShowPassword = () => {
        password.current?.getAttribute('type') === 'password' ?  password.current.setAttribute('type', 'text') : password.current?.setAttribute('type', 'password');
    }
    return (
        <>
         <Head>
                <title>Login | Del Bosque Bordados - Tienda</title>
                <meta name="description" content="¡Iniciá sesion en la tienda asi podes realizar compras y guardar tus favoritos!."></meta>
                <meta property="og:image" itemProp="image" content='https://res.cloudinary.com/delbosque-tienda/image/upload/c_scale,h_299/v1639889237/dbblogo_pyw94n.png' />
            </Head>
            <Layout categories= {props.categories}>
        <Container hide={hide ? 1 : 0}>
            <Background></Background>
            <Wrapper onSubmit={handleSubmit}>
                <Notification>{ message}</Notification>
                <InputWrapper style={{ 'marginBottom':'30px'}}>
                    <Title>Email</Title>
                    <Input type='email' ref={email}></Input>
                </InputWrapper>
                <InputWrapper style={{'marginBottom':'40px', position: 'relative'}}>
                    <Title>Contraseña</Title>
                    <Input ref={password} type='password'></Input>
                    <Show src='/assets/showpassword.svg' onClick={handleShowPassword}></Show>
                </InputWrapper>
            <Submit type='submit' disabled={isFetching}>Ingresar</Submit>
            <Button onClick={() => router.push('/auth/resetpassword')}>Olvidé mi contraseña</Button>
            <Button onClick={() => router.push('/auth/register')}>Registrarme</Button>
            <GoogleLogin
                clientId="241739507369-3mc34jahn0dlv1rr8qc1ltnnfs3quf6u.apps.googleusercontent.com"
                render={renderProps => (
                    <GoogleRegister onClick={renderProps.onClick} disabled={renderProps.disabled && isFetching}>Ingresar con Google</GoogleRegister>
                  )}
                onSuccess={responseGoogle}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId={props.facebookId}
                autoLoad={false}
                fields="name,email"
                textButton="Ingresar con Facebook"
                callback={responseFacebook} 
                />

            <Close onClick={() => router.push("/")}><Image  src={close}  alt="" width={19} height={19} /></Close>
            </Wrapper>
        </Container>
        <Products products={props.products} title='Todos los productos' />
        </Layout>        
        </>
    )
}

export default Login

export const  getStaticProps: GetStaticProps = async () => {
    const products:IProduct[] = await getAll()
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return {props: {products, categories: {lines, types}, facebookId: process.env.FACEBOOK_ID}}
  }