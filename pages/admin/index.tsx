import {FormEventHandler, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/user'
import { adminLogin } from '../../services/admin'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import PrivateRoutes from '../../components/privateRoutes'
import Head from 'next/head'

const LogoContainer = styled.div`
    display:flex;
    width:150px;
    margin:2rem auto 5rem auto;
    align-items: center;
    justify-content: center;
    height: 120px;
`
const Logo = styled.img`
    height: 100%;
    object-fit: cover;
    object-position: center center;
`
const Container = styled.div``

const Title = styled.h1`
    margin: 5rem 0px 2rem 5rem;
    font-size: 2rem;
`
const Form = styled.form``

const Input = styled.input`
    width:60%;
    margin-left:5rem;
    margin-bottom: .5rem;
    display: block;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`
const Submit = styled.button`
   background-color: #99877D; 
   border-color:none; 
   margin-left:5rem;
   font-weight: 400;
    line-height: 1.5;
    color: white;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    padding: .375rem .75rem;
    font-size: 1rem;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    border: none;
    &:hover{
        opacity: 0.7;
    }
`
const LoginContainer = styled.div`
    background-color: #99877D;
    width: 358px;
    height: 444px;
    border-radius: 30px;
    filter: drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.25));
    margin: auto;
    top: 50%;
    position: absolute;
    left: 50%;
    margin-top: -222px;
    margin-left: -179px;
`

const LogoSmall = styled.img`
    display: flex;
    margin: auto;
    padding-top: 4rem;
    padding-bottom: 2rem;
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0px 2rem 0px;
    flex-direction: column;
`
const Admin = styled.h1`
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 44px;
    color: #FFF5EB;
`

const Ingresar = styled.div`
   justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    display: flex;
    background: white;
    border-radius: 30px;
    margin-top: 1rem;
    cursor: pointer;
    font-style: normal;
    font-weight: 800;
    font-size: 17.1429px;
    line-height: 21px;
    &:hover{
        opacity: 0.7;
    }
`
const Notification = styled.p`
        margin-left: 5rem;
        margin-top: 1rem;
`

const Homepage: NextPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [ingresar, setIngresar] = useState(false)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [error, setError] = useState(false)
    const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
       
        const form = {
            email: `${email.current?.value}`,
            password: `${password.current?.value}`
        }
        adminLogin(form)
        .then((res:{isAdmin:boolean, token:string}) => {
        if (!res.isAdmin){
            window.location.replace(window.location.origin)  
        }
        else if (res.isAdmin){
            dispatch(login(res.token, res.isAdmin))
            router.push('/admin/dashboard')
        }
        })
        .catch((err:any) => {
            console.log(err)
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        })
    }
    
    return (
        <PrivateRoutes admin={true}>
                <Head>
                    <title>Admin: Login | DelBosqueBordados-Tienda</title>
                </Head>
                {!ingresar ?
                    (
                        <LoginContainer>
                            <LogoSmall src="/assets/DBB - LOGO.svg"/>
                            <Wrapper>
                                <Admin>Admin</Admin>
                                <Ingresar onClick={()=> setIngresar(true)}>Ingresar</Ingresar>
                            </Wrapper>
                        </LoginContainer>
                    ) :
                    (<>
                    <LogoContainer>
                    <Logo src="/assets/delbosque-logo.svg" />
                    </LogoContainer>
                    <Container>
                    <Title>Ingresar</Title>
                    <Form onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Email" ref={email}></Input>
                    <Input type="password" placeholder="Password" ref={password}></Input>
                    <Submit type='submit'>Ingresar</Submit>
                    </Form>
                    <Notification>{error && 'Usuario o contraseña incorrectos'}</Notification>
                    </Container>
                    </>)
                }
        </PrivateRoutes>
    )
}

export default Homepage