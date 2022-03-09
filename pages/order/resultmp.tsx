import { useEffect, useState } from 'react'
import { getMPStatus, updateOrder } from '../../services/orders'
import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { getAllCategories } from '../../services/categories'
import { getAllTypes } from '../../services/types'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { ICategory } from '../../types/categories'
import { IType } from '../../types/types'
import PrivateRoutes from '../../components/privateRoutes'
import { useAppSelector } from '../../store/hooks'
import Navbar from '../../components/navbar'

const Container = styled.div`
    margin: 1rem 8%;
    display: flex;
    flex-direction: column;
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

const Title = styled.h1`
    margin-left: 10px;
    font-weight: 800;
    font-size: 23px;
    line-height: 28px;
    color: #000000;
`

const Message = styled.div`
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: black;
    margin: 1rem 2rem;
`

const LinkLogin = styled.a`
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: black;
    margin: 0px;
    padding: 0px;
    cursor: pointer;
    text-decoration: underline;
`
const PaymentResultMP:NextPage = ({categories}:InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter()
    const [statusRes, setStatusRes] = useState(false)
    const [status, setStatus] = useState(false)
    const [message, setMessage] = useState('')
    const {user} = useAppSelector(state => state.userReducer)
    useEffect(() => {
        const getStatus = async () => {
            getMPStatus(window.location.search)
            .then(res => {
            if (res.status === 'approved') {
                console.log(res)
                const form = {
                    paymentMPStatus: 'Aprobado',
                    paymentMPStatus_detail: res.statusDetail,
                    MPPreferenceId: res.preferenceId
                }
                setStatus(true)
                setStatusRes(true)
                updateOrder(form, user)
                .then(resOrder => {
                    setTimeout(() => {
                        router.push('/user/myorder/'+ resOrder._id)
                    }, 5000)
                }) 
                .catch(err => console.log(err))
            } 
            else {
                if (router.query.status === 'failure'){
                    const form = {
                        paymentMPStatus: 'Fallido',
                        MPPreferenceId: res.preferenceId
                    }
                    setMessage('Ocurrió un error en el proceso de pago. En 5 segundos le redirigiremos a la pagina con la orden de compra donde podrá volver a gestionar el pago...')
                    setStatus(false)
                    setStatusRes(true)
                    updateOrder(form, user) 
                    .then(res => {
                        setTimeout(() => {
                            router.push('/user/myorder/'+ res._id)
                        }, 5000)
                    }) 
                    .catch(err => console.log(err))
                }
                else {
                    const form = {
                        paymentMPStatus: 'Pendiente de aprobación',
                        MPPreferenceId: res.preferenceId
                    }  
                    setMessage('Su pago esta siendo procesado por MercadoPago y se encuentra en estado "pendiende de aprobación". Recibirá un email en cuanto mercadopago actualicé el estado del pago. <br />  En 5 segundos le redirigiremos al resumen de su compra...')
                    setStatus(false)
                    setStatusRes(true)
                    updateOrder(form, user)
                    .then(res => {
                        setTimeout(() => {
                            router.push('/user/myorder/'+ res._id)
                        }, 5000)
                    }) 
                    .catch(err => console.log(err))
                }
            }
            }) 
            .catch(err => console.log(err))
        }
            getStatus()         
    }, [])
    return (
        <PrivateRoutes>
        <Head>
            <title>{status ? 'Finalización de compra' : 'Error en el proceso de pago'} | Del Bosque Bordados - Tienda</title>
        </Head>
        <Navbar categories={categories} />
        <Container>
        <Title>{status ? 'Finalización de compra' : 'Error en el proceso de pago'}</Title>
        <Wrapper>
            {status ? 
            <Message>¡Su pago ha sido exitoso!. Hemos enviado un mail con la confirmación de su compra a la cuenta de correo electrónico registrada. Cuando el producto sea despachado le enviaremos un mail con el codifo de seguimiento. <br />
            En 5 segundos le redirigiremos al resumen de su compra...
            </Message> : 
                <Message> {message}
            </Message>}
        </Wrapper>
        </Container>
        </PrivateRoutes> 
    )
}

export default PaymentResultMP

export const getStaticProps: GetStaticProps = async () => {
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return {props: {categories: {lines, types}}}
  }
