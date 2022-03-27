import Topbar from "../../components/admin/topbar"
import Navbar from "../../components/admin/navbar"
import {useEffect, useState } from 'react'
import { getAdminOrders } from '../../services/orders'
import { useRouter } from "next/router"
import EditOrder from "../../components/admin/editOrder"
import { NextPage } from "next"
import { useAppSelector } from "../../store/hooks"
import { IOrderWithItemsList } from "../../types/order"
import PrivateRoutes from "../../components/privateRoutes"
import OrdersTable from "../../components/admin/ordersTable"
import styled from 'styled-components'
import Head from "next/head"

const OrdersContainer = styled.div`
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
    margin-bottom: 2rem;
`

const OrdersPage: NextPage = () => {
    const router = useRouter()
    const [orders, setOrders] = useState<IOrderWithItemsList[]>([])
    const {user} = useAppSelector(state => state.userReducer)
    
    useEffect(() => {
        if(user){
            getAdminOrders(user)
            .then((res:IOrderWithItemsList[]) => setOrders(res))
            .catch((err:any) => console.log(err))
        }
    }, [user])
    
    return (
        <PrivateRoutes admin={true}>
            <Head>
                <title>Admin: Pedidos | DelBosqueBordados-Tienda</title>
            </Head>
            <Topbar />
            <Navbar />
            <OrdersContainer>
                <Title>Pedidos</Title>
            <OrdersTable orders={orders}/>
            </OrdersContainer>
            {router.query.order && <EditOrder />}
        </PrivateRoutes>
    )
}

export default OrdersPage