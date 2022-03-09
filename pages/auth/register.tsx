import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import close from '../../public/assets/x.png'
import Image from 'next/image'
import GoogleLogin from 'react-google-login';
import { userLoginFacebook, userLoginGoogle, userRegister} from '../../services/users'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Products from '../../components/products'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Layout from '../../components/layout'
import { getAll } from '../../services/products'
import { getAllCategories } from '../../services/categories'
import { getAllTypes } from '../../services/types'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { IProduct } from '../../types/product'
import { ICategory } from '../../types/categories'
import { IType } from '../../types/types'
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/user';
import FacebookLogin from 'react-facebook-login';

const Container = styled.div`

`

const Background = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    background: rgba(196, 196, 196, 0.58);
    top: 0px;
    z-index: 1;
`
const Wrapper = styled.div`
    position: fixed;
    background: #99877D;
    box-shadow: 0px 6.32558px 15.814px rgb(0 0 0 / 25%);
    border-radius: 23.7209px;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.5rem 1.15rem 2.5rem 1.15rem;
    z-index: 2;
    transform: translate(-50%, -50%);

    @media (max-width: 700px){
        margin-left: -172px;
        width: 344px;
        overflow-y: scroll;
        justify-content: center;
        position: absolute;
    }
`
const FormWrapper = styled.form`
    display:flex; 
    flex-direction:row;
    @media (max-width: 700px){
        flex-direction: column;
    }
`
const Notification = styled.div`
    color: wheat;
    position: fixed;
    margin-top: -45px;
`

const ColumnWrapper = styled.div`
    display:flex; 
    flex-direction:column;
    margin:0px 2rem;
`
const InputWrapper = styled.div`
    margin-bottom: 23px;
`
const Title = styled.h1`
    font-style: normal; 
    font-weight: 800; 
    font-size: 17.1429px; 
    line-height: 21px;
    color: #FFFFFF;
    margin-bottom: 11px;
`

const Submit = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background: #FFFFFF;
    border-radius: 30px;
    margin:1rem 0px 1.5rem 0px; 
    cursor: pointer;
    border: none;
    color: #99877D;
    &:hover {
        opacity: 0.7;
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
    justify-content: end;
    place-content: end;
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
    top: 40px;
    display: flex;
    cursor: pointer;
    opacity: 0.7;

    &:hover{
        opacity: 0.5;
    }
`
const formSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Debes especificar un nombre y apellido")
      .min(3, "Mínimo 3 caracteres")
      .max(40, "Máximo 40 caracteres"),
    email: Yup.string()
      .required("Debes especificar un email")
      .email("Correo electronico invalido")
      .max(50, "Máximo 50 caracteres"),
    password: Yup.string()
      .required("Debes especificar una contraseña")
      .min(6, "Mínimo 6 caracteres")
      .max(20, "Máximo 20 caracteres"),
    telefono: Yup.string()
      .required("Debes especificar un teléfono")
      .min(6, "Mínimo 6 caracteres")
      .max(20, "Máximo 20 caracteres"),
    direccion: Yup.string()
      .required("Debes especificar una dirección")
      .min(4, "Mínimo 4 caracteres")
      .max(50, "Máximo 50 caracteres"),
    cp: Yup.string()
      .required("Debes especificar un cod postal")
      .min(4, "Mínimo 4 caracteres")
      .max(5, "Máximo 5 caracteres"),
    localidad: Yup.string()
      .required("Debes especificar una localidad")
      .min(3, "Mínimo 3 caracteres")
      .max(50, "Máximo 50 caracteres"),
    documento: Yup.string()
      .required("Debes especificar un documento")
      .min(6, "Mínimo 6 caracteres")
      .max(20, "Máximo 20 caracteres"),
    
  })
const Register:NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter()
    const [isFetching, setIsFetching] = useState(false);
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async (values:any) => {
            setIsFetching(true)      
            const form= {
                name: values.nombre,
                email: values.email,
                password: values.password,
                phone: values.telefono,
                street: values.direccion,
                zip: values.cp,
                city: values.localidad,
                country: 'Argentina',
                document: values.documento,
                favorites:  localStorage.likes ? JSON.parse(localStorage.likes) : [],
                cart: localStorage.cart ? localStorage.cart : '',
            }
            userRegister(form)
            .then(res =>  {
                setMessage('¡Registro exitoso!')
                setTimeout(()=> {
                    router.push("/auth/mailconfirm?regtoken="+ res.token)
                }, 4000)
            })
            .catch(err => {
                setIsFetching(false);      
                console.log(err);
            })
    }

    const responseGoogle = async (response:any) => {
        console.log(response)
        setIsFetching(true)      
        const form ={
                tokenId: response.tokenId,
                favorites: localStorage.likes ? JSON.parse(localStorage.likes) : [],
                cart: localStorage.cart ? localStorage.cart : '',
        }
        console.log(form)
        userLoginGoogle(form)        
        .then(res =>  {
            console.log(res)
            setMessage('¡Ingreso exitoso!')
            setTimeout(()=> {
                res && localStorage.setItem('token', res.token)
                res && localStorage.setItem('user', res.user)
                res && localStorage.setItem('isAdmin', res.isAdmin)
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
        })          
        .catch(err => {
            setIsFetching(false)      
            setMessage('Algo ha fallado...')
            console.log(err);
            setTimeout(() => {
                setMessage('')
            },4000)
        })
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
                res && localStorage.setItem('token', res.token)
                res && localStorage.setItem('user', res.user)
                res && localStorage.setItem('isAdmin', res.isAdmin)
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
            }, 4000);
        }
    }
    const googleFailure = (err:any) => {
        console.log(err)
    }

    const handleShowPassword = () => {
        const elem = document.getElementById('password')
        elem?.getAttribute('type') === 'password' ?  elem.setAttribute('type', 'text') : elem?.setAttribute('type', 'password');
    }
    return (
        <>
        <Head>
            <title>Register | Del Bosque Bordados - Tienda</title>
            <meta name="description" content="¡Registrate en la tienda asi podes realizar compras y guardar tus favoritos!."></meta>
            <meta property="og:image" itemProp="image" content='https://res.cloudinary.com/delbosque-tienda/image/upload/c_scale,h_299/v1639889237/dbblogo_pyw94n.png' />
        </Head>
        <Layout categories={props.categories}>
        <Container>
            <Background></Background>
            <Wrapper>
            <Notification>{message}</Notification>
            <Formik
                initialValues= {{
                    name: '',
                    email:'',
                    password: '',
                    telefono: '',
                    direccion: '',
                    cp: '',
                    localidad: '',
                    document: '',
                }}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
            >
            {() => 
            (<Form className='register__form'>
                <FormWrapper>
                <ColumnWrapper>
                    <InputWrapper>
                        <Title>Nombre y Apellido</Title>
                        <Field className="register__field" name='nombre' type='text' id='nombre' />
                    </InputWrapper>
                    <ErrorMessage name='nombre' component='div' className='error'/>
                    <InputWrapper>
                        <Title>Email</Title>
                        <Field className="register__field" name='email' type='email'  id='email' />
                    </InputWrapper>
                    <ErrorMessage name='email' component='div' className='error'/>
                    <InputWrapper style={{position: 'relative'}}>
                        <Title>Contraseña</Title>
                        <Field  className="register__field" name='password' type='password'  id='password'/>
                        <Show src='/assets/showpassword.svg' onClick={handleShowPassword}></Show>
                    </InputWrapper>
                    <ErrorMessage name='password' component='div' className='error' />
                    <InputWrapper>
                        <Title>Teléfono</Title>
                        <Field className="register__field" name='telefono' type='text' id='telefono'/>
                    </InputWrapper>
                    <ErrorMessage name='telefono' component='div' className='error'/>
                </ColumnWrapper>
                <ColumnWrapper>
                    <InputWrapper>
                        <Title>Dni/Pasaporte</Title>
                        <Field className="register__field" name='documento' type='text' id='documento' />
                    </InputWrapper>
                    <ErrorMessage name='documento' component='div' className='error'/>
                    <InputWrapper>
                        <Title>Cod. Postal</Title>
                        <Field className="register__field" name='cp' type='text' id='cp' />
                    </InputWrapper>
                    <ErrorMessage name='cp' component='div' className='error'/>
                    <InputWrapper>
                        <Title>Localidad</Title>
                        <Field className="register__field" name='localidad' type='text' id='localidad' />
                    </InputWrapper>
                    <ErrorMessage name='localidad' component='div' className='error'/>
                    <InputWrapper>
                        <Title>Dirección</Title>
                        <Field className="register__field" name='direccion' type='text' id='direccion' />
                    </InputWrapper>
                    <ErrorMessage name='direccion' component='div' className='error'/>
                </ColumnWrapper>
                </FormWrapper>
            <Submit type='submit' disabled={isFetching}>Registrarse</Submit>
            </Form>)} 
            </Formik>
            <GoogleLogin
                clientId={props.googleId}
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
            <Close onClick={() => router.push("/")}><Image src={close} alt="close" width={19} height={19}/></Close>               
            </Wrapper>
        </Container>
        <Products products={props.products} title='Todos los productos' />
        </Layout>
        </>
    )
}

export default Register

export const getStaticProps: GetStaticProps = async() => {
    const products:IProduct[] = await getAll()
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return {props: {products, categories: {lines, types}, googleId: process.env.GOOGLE_ID}}
  }
