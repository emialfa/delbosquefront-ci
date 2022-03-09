import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addShipping} from '../../store/actions/cart'
import {userShippingAddress} from '../../store/actions/user'
import { getProfile, userUpdate } from '../../services/users'
import { getApiShippingCost } from '../../services/cart'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAllCategories } from '../../services/categories'
import { getAllTypes } from '../../services/types'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { ICategory } from '../../types/categories'
import { IType } from '../../types/types'
import { useAppSelector } from '../../store/hooks'
import { IUserWithShippingAddressObject } from '../../types/user'
import PrivateRoutes from '../../components/privateRoutes'
import Navbar from '../../components/navbar'

const Container = styled.div`
    display: block;
    background: white;
    border-radius: 30px;
    padding: 3rem 2rem 1rem 2rem;
    top: 0px;
    right: 0px;
    overflow-y: auto;
    z-index:1;
    width: 465px;
    margin: 1rem auto;
`
const Title = styled.h1`
    font-style: normal;
    font-weight: 800;
    font-size: 21px;
    line-height: 26px; 
    color:black;
    margin-left: 15px;
`
const Separator = styled.div`
    width: 100%;;
    background-color: black;
    height: 1px;
    margin: 1.5rem 0px 2.5rem 0px;
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
    margin-left: 15px;
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

    &:hover{
        opacity: 0.7;
    }
`

const ChangePassword = styled.div`
    box-sizing: border-box;
    border-radius: 15px;
    font-style: normal;
    font-weight: 800;
    font-size: 17px;
    line-height: 21px;
    color: black;
    padding: 10px;
    margin: 0.3rem;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px black;

    &:hover {
        box-shadow: inset 0 0 0 1px grey;
    }
`

const Arrow = styled.div<{hide:number}>`
	margin: ${(props) => props.hide ? '5px -42px 0px 0px' : '15px -101px -15px 0px'};
	width: 10px;
	height: 10px;
	box-sizing: border-box;
	transform: ${(props) => props.hide ? 'rotate(-45deg)' : 'rotate(135deg)'};
	content: '';
	border-width: .4vmin .4vmin 0 0;
	border-style: solid;
	display: block;
	transform-origin: 100% 0;
    color: black;
`

const Notification = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 17px;
    line-height: 21px;
    color:red;
    margin: auto;
    text-align: center;
    margin-top: -29px;
    margin-bottom: 15px;
`

const ShippingPage:NextPage = ({categories}:InferGetStaticPropsType<typeof getStaticProps>) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { shippingCost, zip, city } = useAppSelector(state => state.cartReducer)
    const { user } = useAppSelector(state => state.userReducer)
    const [userData, setUserData] = useState<IUserWithShippingAddressObject>()
    const [message, setMessage] = useState('')
    const [hideAddress, setHideAddress] = useState(false)
    const name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const phone = useRef<HTMLInputElement>(null)
    const document = useRef<HTMLInputElement>(null)
    const city0 = useRef<HTMLInputElement>(null)
    const street = useRef<HTMLInputElement>(null)
    const zip0 = useRef<HTMLInputElement>(null)
    const name1 = useRef<HTMLInputElement>(null)
    const email1 = useRef<HTMLInputElement>(null)
    const phone1 = useRef<HTMLInputElement>(null)
    const document1 = useRef<HTMLInputElement>(null)
    const city1 = useRef<HTMLInputElement>(null)
    const street1 = useRef<HTMLInputElement>(null)
    const zip1 = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    },[])

    useEffect(() => {
        const fetchData = async () => {
            getProfile(user)
            .then((res) => {
            res.shippingAdress = res.shippingAdress? JSON.parse(res.shippingAdress) : '';
            setUserData(res)
            res.zip ?
            res.zip !== '8000' ? dispatch(addShipping(420, parseInt(res.zip), `${res.city}`)) : dispatch(addShipping(0, parseInt(res.zip), res.city))
            :  dispatch(addShipping(0, 0, ''));
            })
            .catch(err => console.log(err))
        }
        fetchData()
    },[])

    const handleShippingCost = async () => {
        if (!hideAddress){
            const form = {
                name: name.current?.value,
                document: document.current?.value,
                zip: zip0.current?.value,
                city: city0.current?.value,
                street: street.current?.value,
                phone: phone.current?.value,
                email: email.current?.value
            }
            if (form.name && form.document && form.zip && form.city && form.street && form.phone && `${form.email}`.indexOf('@') > 0) {
                getApiShippingCost(form.zip).then(res => {
                    if (res.length > 0) {
                        dispatch(userShippingAddress(form))
                        form.zip !== '8000' ? dispatch(addShipping(420, parseInt(res[0].codpostal), res[0].localidad)) : dispatch(addShipping(0, parseInt(res[0].codpostal), res[0].localidad))
                        userUpdate(form, user)
                        .catch(err => console.log(err))
                        router.push('/order/payment')
                    }
                    else {
                        dispatch(addShipping(0, 0 , 'Sin sucursal'))
                        city0.current!.value = 'Sin sucursal';
                        setMessage('Sin sucursal')   
                    }        
                }) 
                .catch(err => console.log(err))
            }
            else {
                setMessage('Todos los campos deben estar completos.')
            }
        }
        else if(hideAddress){
            const form = {
                name: name1.current?.value,
                document: document1.current?.value,
                zip: zip1.current?.value,
                city: city1.current?.value,
                street: street1.current?.value,
                phone: phone1.current?.value,
                email: email1.current?.value
            }
            if (form.name && form.document && form.zip && form.city && form.street && form.phone && `${form.email}`.indexOf('@') > 0) {
                getApiShippingCost(form.zip).then(res => {
                    if (res.length > 0) {
                        dispatch(userShippingAddress(form))
                        dispatch(addShipping(420, parseInt(res[0].codpostal), res[0].localidad))   
                        const obj = {shippingAdress: JSON.stringify(form)}
                        userUpdate(obj, user)
                        .catch(err => console.log(err))
                        router.push('/order/payment')
                    }
                    else {
                        dispatch(addShipping(0, 0 , 'Sin sucursal'))
                        city1.current!.value = 'Sin sucursal'   
                        setMessage('Sin sucursal')   
                    }        
                }) 
                .catch(err => console.log(err))

            }
            else {
                setMessage('Todos los campos deben estar completos.')
            }
        }
    }
   
    const handleZip = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        value.length === 4 &&  getApiShippingCost(value).then(res => {
            if (res.length > 0) {
                if(res[0].codpostal !== '8000'){
                    dispatch(addShipping(420, parseInt(res[0].codpostal), res[0].localidad))
                } else {
                    dispatch(addShipping(0, parseInt(res[0].codpostal), res[0].localidad))
                }
                zip0.current ? city0.current!.value = res[0].localidad : city1.current!.value = res[0].localidad            }
            else {
            dispatch(addShipping(0, 0 , 'Sin sucursal'))
            zip0.current ? city0.current!.value =  'Sin sucursal' : city1.current!.value = 'Sin sucursal'      
            }        
        }) 
        .catch(err => console.log(err))
    }

    const handleAddress = () => {
        setHideAddress(!hideAddress)
    }
    return (
        <PrivateRoutes>
        <Head>
            <title>Datos para el envío | Del Bosque Bordados - Tienda</title>
        </Head>
        <Navbar categories={categories} />
        <Container>
            <Notification>{message}</Notification>
            <Title>Datos para el envío</Title>
            <Separator/> 
                {!hideAddress && 
                <>
                <Row>
                    <NameData>Nombre y Apellido:</NameData>
                   <InputData autoFocus type='text' defaultValue={userData?.name} ref={name}></InputData>
                </Row>
                <Row>
                    <NameData >Dni/Pasaporte:</NameData>
                   <InputData  type='text' defaultValue={userData?.document} ref={document}></InputData>
                </Row>
                <Row>
                    <NameData >Cod. Postal:</NameData>
                   <InputData type='text' defaultValue={userData?.zip || zip} ref={zip0}  onChange={handleZip}></InputData>
                </Row>
                <Row>
                    <NameData >Localidad:</NameData>
                   <InputData type='text' defaultValue={userData?.city || city} ref={city0}></InputData>
                </Row>
                <Row>
                    <NameData >Dirección:</NameData>
                  <InputData type='text' defaultValue={userData?.street} ref={street}></InputData>
                </Row>
                <Row>
                    <NameData >Teléfono:</NameData>
                   <InputData type='text' defaultValue={userData?.phone} ref={phone}></InputData>
                </Row>
                <Row>
                    <NameData >Email:</NameData>
                    <InputData type='email' defaultValue={userData?.email} ref={email}></InputData>
                </Row>
                </>}
                <Row onClick={handleAddress} style={{marginTop: '.5rem', cursor: 'pointer'}}>
                    <NameData>Otra dirección:</NameData>
                    <Arrow hide={hideAddress ? 1 : 0}/>
                </Row>
                {hideAddress &&
                <div style={{marginLeft: '10px'}}>
                <Row>
                    <NameData>Nombre y Apellido:</NameData>
                   <InputData autoFocus type='text' defaultValue={userData?.shippingAdress?.name} ref={name1}></InputData>
                </Row>
                <Row>
                    <NameData>Dni/Pasaporte:</NameData>
                   <InputData type='text' defaultValue={userData?.shippingAdress?.document} ref={document1}></InputData>
                </Row>
                <Row>
                    <NameData>Cod. Postal:</NameData>
                   <InputData type='text' defaultValue={userData?.shippingAdress?.zip} ref={zip1} onChange={handleZip}></InputData>
                </Row>
                <Row>
                    <NameData>Localidad:</NameData>
                   <InputData type='text' defaultValue={userData?.shippingAdress?.city} ref={city1}></InputData>
                </Row>
                <Row>
                    <NameData>Dirección:</NameData>
                  <InputData type='text' defaultValue={userData?.shippingAdress?.street} ref={street1}></InputData>
                </Row>
                <Row>
                    <NameData>Teléfono:</NameData>
                   <InputData type='text' defaultValue={userData?.shippingAdress?.phone} ref={phone1}></InputData>
                </Row>
                <Row>
                    <NameData>Email:</NameData>
                    <InputData type='email' defaultValue={userData?.shippingAdress?.email} ref={email1}></InputData>
                </Row>
                </div>
                }
                <Row>
                    <NameData style={{margin: '20px auto',}}>Costo de envío:   ${shippingCost}</NameData>
                </Row>
                <Row style={{margin: 'auto', justifyContent: 'center', marginTop: '.5rem'}}>                   
                    <UpdateData onClick={handleShippingCost}>Continuar compra</UpdateData>
                    <Link href='/'>
                    <a className='link hover'> 
                    <ChangePassword>Cancelar compra</ChangePassword>
                    </a>
                    </Link>                    
                </Row>
        </Container>
        </PrivateRoutes>
    )
}

export default ShippingPage

export const  getStaticProps: GetStaticProps = async() => {
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return {props: {categories: {lines, types}}}
  }