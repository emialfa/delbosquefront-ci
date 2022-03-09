import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { getProfile, userUpdate } from '../../services/users'
import { getAllCategories } from '../../services/categories'
import { getAllTypes } from '../../services/types'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { ICategory } from '../../types/categories'
import { IType } from '../../types/types'
import { useAppSelector } from '../../store/hooks'
import { useRouter } from 'next/router'
import { IUser } from '../../types/user'
import PrivateRoutes from '../../components/privateRoutes'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'


const Container = styled.div`
    margin: 0px 8%;
    display: flex;
    flex-direction: column;
`

const Title = styled.h1`
    margin-left: 10px;
    font-weight: 800;
    font-size: 23px;
    line-height: 28px;
    color: #000000;
`
const Wrapper = styled.div`
    display: flex;
    margin: 2rem 0px;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: white;
    border-radius: 30px;
    width: 100%;
    min-height: 10rem;
    padding: 1rem 2rem;
`
const Row = styled.div`
    display:flex;
    flex-direction:row;
`
const NameData = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 17px;
    line-height: 21px;
    color:black;
    margin-right: 1rem;
    margin-bottom: 1rem;
`
const UserData = styled.p`
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 20px;
    color:black;
`
const InputData = styled.input`
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 20px;
    color:black;
    margin-top: -1rem;
    border: none;
    padding: 0px;
    text-decoration: none;
`

const UpdateData = styled.div`
    background: #99877D;
    border-radius: 15px;
    font-style: normal;
    font-weight: 800;
    font-size: 17px;
    line-height: 21px;
    color:white;
    padding: 10px;
    margin: 0.3rem;
    cursor: pointer;
    text-align: center;

    &:hover {
        opacity: 0.7;
    }
`

const ChangePassword = styled.div`
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 15px;
    font-style: normal;
    font-weight: 800;
    font-size: 17px;
    line-height: 21px;
    color: black;
    padding: 9px;
    margin: 0.3rem;
    cursor: pointer;
    text-align: center;

    
    &:hover {
        opacity: 0.7;
    }
`

const Background = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    background: rgba(196, 196, 196, 0.58);
    top: 0px;
    left: 0px;
`

const WrapperChangePassword = styled.form`
    position:fixed;
    width: 346px;
    height: 406px;
    background: #99877D;
    box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
    border-radius: 23.7209px;
    top:50%;
    left:50%;
    margin-top:-203px;
    margin-left:-173px;
    display: flex;
    flex-direction: column; 
    align-items:center;
    padding:3rem 0px;
    z-index: 2;
`

const Notification = styled.p`
    color: wheat;
    position: fixed;
    margin-top: 305px;
    width: 300px;
    text-align: center;
`

const InputWrapper = styled.div`
    margin-bottom: 20px;
`

const TitleChangePassword = styled.div`
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

const Submit = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background: #FFFFFF;
    border-radius: 30px;
    margin: 1rem 0px 1.5rem 0px;
    cursor: pointer;
    border: none;
    color: #99877D;

    &:hover {
        opacity: 0.7;
    }
`
const Close = styled.img`
    top: 50%;
    left: 50%;
    margin-top: -183px;
    margin-left: 133px;
    position: fixed;
    cursor: pointer;
    z-index: 3;

    &:hover{
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

const UserConfig:NextPage = ({categories}:InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter()
    const [userData, setUserData] = useState<IUser>()
    const [update, setUpdate] = useState(false)
    const [viewChangePassword, setViewChangePassword] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const { user } = useAppSelector(state => state.userReducer)
    const name = useRef<HTMLInputElement>(null)
    const email =  useRef<HTMLInputElement>(null)
    const phone =  useRef<HTMLInputElement>(null)
    const document =  useRef<HTMLInputElement>(null)
    const city =  useRef<HTMLInputElement>(null)
    const street =  useRef<HTMLInputElement>(null)
    const zip =  useRef<HTMLInputElement>(null)
    const prevPassword =  useRef<HTMLInputElement>(null)
    const password =  useRef<HTMLInputElement>(null)
    const rePassword =  useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(!user){
            router.push('/')
        }
        else if(user){
        getProfile(user)
        .then(res =>  setUserData(res))
        }
    },[])

    const handleUpdate = async () => {
        const form = {
            name: name.current ? name.current.value : userData?.name ,
            email: email.current ? email.current.value : userData?.email,
            phone: phone.current ? phone.current.value : userData?.phone,
            document: document.current ? document.current.value : userData?.document,
            city: city.current ? city.current.value : userData?.city,
            street: street.current ? street.current.value : userData?.street,
            zip: zip.current ? zip.current.value : userData?.zip,
        }
        setUpdate(false)
        userUpdate(form, user)  
        .then(res => setUserData(res))
        .catch(err => console.log(err))
    }
    
    const handleChangePassword = async () => {
        if(password.current?.value !== rePassword.current?.value){
            setError(true);
            setMessage('Las contraseñas no coinciden');
            return null;
        }
        if ((`${prevPassword.current?.value}`).length < 5 || (`${password.current?.value}`).length < 5){
            setError(true);
            setMessage('La contraseña debe tener más de 4 caracteres')
        }
        else {
            const form = {
                password: prevPassword.current?.value,
                newPassword: password.current?.value,
            }
            userUpdate(form, user)            
            .then(res => {
                setError(false)
                setMessage('')
                setViewChangePassword(false)
            })
            .catch(err => console.log(err))
        }
    }
    const handleShowPassword = (name:string) => {
        const elem = name === 'prevPassword' ? prevPassword.current : name === 'password' ? password.current : rePassword.current;
        elem?.getAttribute('type') === 'password' ?  elem.setAttribute('type', 'text') : elem?.setAttribute('type', 'password');
    }
    return (
        <>
        <PrivateRoutes>
         <Head>
            <title>Mi configuración | DelBosqueBordados-Tienda</title>
        </Head>
        <Navbar categories={categories} /> 
        <Container>
            <Title>Mi configuración</Title>
            <Wrapper>
                <Row>
                    <NameData>Nombre y Apellido:</NameData>
                    {!update ? 
                    (<UserData>{userData?.name}</UserData>)    
                    : (<InputData autoFocus type='text' defaultValue={userData?.name} ref={name}></InputData>)}
                </Row>
                <Row>
                    <NameData>Email:</NameData>
                    {!update ? 
                    (<UserData>{userData?.email}</UserData>)
                    : (<InputData type='text' defaultValue={userData?.email} ref={email}></InputData>)}
                </Row>
                <Row>
                    <NameData>Teléfono:</NameData>
                    {!update ?
                    (<UserData>{userData?.phone}</UserData>)
                    : (<InputData type='text' name='phone' defaultValue={userData?.phone} ref={phone}></InputData>)}
                </Row>
                <Row>
                    <NameData>Dni/Pasaporte:</NameData>
                    {!update ? 
                    (<UserData>{userData?.document}</UserData>)
                    : (<InputData type='text' defaultValue={userData?.document} ref={document}></InputData>)}
                </Row>
                <Row>
                    <NameData>Localidad:</NameData>
                    {!update ? 
                    (<UserData>{userData?.city}</UserData>)
                    : (<InputData type='text' defaultValue={userData?.city} ref={city}></InputData>)}
                </Row>
                <Row>
                    <NameData>Dirección:</NameData>
                    {!update ? 
                    (<UserData>{userData?.street}</UserData>)
                    : (<InputData type='text' defaultValue={userData?.street} ref={street}></InputData>)}
                </Row>
                <Row>
                    <NameData>Cod. Postal:</NameData>
                    {!update ? 
                    (<UserData>{userData?.zip}</UserData>)
                    : (<InputData type='text' defaultValue={userData?.zip} ref={zip}></InputData>)}
                </Row>
                <Row style={{margin: 'auto'}}>
                    {!update ? 
                    (<><UpdateData onClick={() => setUpdate(true)}>Modificar datos</UpdateData>
                    <ChangePassword onClick={() => setViewChangePassword(true)}>Cambiar contraseña</ChangePassword></>)
                    : (<><UpdateData onClick={handleUpdate}>Guardar datos</UpdateData>
                    <ChangePassword  onClick={() => setUpdate(false)}>Volver al menu anterior</ChangePassword></>)
                    }
                </Row>
            </Wrapper>
            {viewChangePassword && (<>
                <Background></Background>
            <WrapperChangePassword autoComplete="off">
                <InputWrapper style={{position: 'relative'}}>
                    <TitleChangePassword>Contraseña anterior</TitleChangePassword>
                    <Input type='password' name="actualPassword" autoComplete="" ref={prevPassword}></Input>
                    <Show src='/assets/showpassword.svg' onClick={() => handleShowPassword('prevPassword')}></Show>
                </InputWrapper>
                <InputWrapper style={{position: 'relative'}}>
                    <TitleChangePassword>Nueva contraseña</TitleChangePassword>
                    <Input type='password' name="newPassword" ref={password}></Input>
                    <Show src='/assets/showpassword.svg' onClick={() => handleShowPassword('password')}></Show>
                </InputWrapper>
                <InputWrapper style={{position: 'relative'}}>
                    <TitleChangePassword>Repita nueva contraseña</TitleChangePassword>
                    <Input type='password' name="repeatNewPassword" ref={rePassword}></Input>
                    <Show src='/assets/showpassword.svg' onClick={() => handleShowPassword('rePassword')}></Show>
                </InputWrapper>
            <Submit onClick={handleChangePassword}>Guardar nueva contraseña</Submit>
            <Notification>{error && message}</Notification>
            </WrapperChangePassword>
            <Close src="/assets/x.png" alt="" onClick={() => setViewChangePassword(false)}></Close>
            </>)}
        </Container>
        <Footer />
        </PrivateRoutes>     
        </>
    )
}

export default UserConfig

export const getStaticProps: GetStaticProps = async () => {
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return {props: {categories: {lines, types}}}
  }

