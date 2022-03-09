import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getOrders } from '../../services/orders'
import { getAllCategories } from '../../services/categories'
import { getAllTypes } from '../../services/types'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { ICategory } from '../../types/categories'
import { IType } from '../../types/types'
import { IOrder } from '../../types/order'
import { useAppSelector } from '../../store/hooks'
import { IProduct } from '../../types/product'
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
    padding: 1rem 0rem;
`
const ProductContainer = styled.div`
    display:flex;
    flex-direction:row;
    padding: 1rem 0rem 1rem 3rem;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;

    &:hover{
        background-color: rgba(0, 0, 0, 0.04);
    }
`
const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 92px;
    height: 63px;
`
const Image = styled.img`
    border-radius: 5.41712px;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    width: 100%;
`

const WrapperOrder = styled.div`
    display:flex; 
    flex-direction:column;
    margin-left: 2rem;
`
const ProductTitle = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 13.9px;
    height: 17px;
    color: black;
    margin-bottom: 3px;
`
const Category = styled.p`
    font-style: normal;
    font-weight: 300;
    font-size: 11px;
    line-height: 107.3%; 
    color: black;
    margin-bottom: 11px;
`
const Price = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 13.9px;
    line-height: 17px;
    color: black;
    margin: 0;
`

const UserOrders:NextPage = ({categories}:InferGetStaticPropsType<typeof getStaticProps>) => {
    const [orders, setOrders] = useState<any[]>([])
    const { user } = useAppSelector(state => state.userReducer)
    const router = useRouter()
    useEffect(() => {
        if(!user){
            router.push("/")
        }
        else{
        getOrders(user)
        .then(res => {
            const ordersArr:any[] = []
            res.map((o:IOrder) => {
                
                var dateFormat = new Date(`${o.dateOrdered}`); // M-D-YYYY
		        var d = dateFormat.getDate();
		        var m = dateFormat.getMonth();
		        var y = dateFormat.getFullYear();
                const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
		        const date = (d <= 9 ? '0' + d : d) + ' de ' + months[m] + ' - ' + y;

                const items =  JSON.parse(o.orderItems)
                const price = `$${items.total} ($${items.subtotal} + $${items.shippingCost} Envío)`
                const orderProducts:string[] = []
                const orderImages:string[] = []
                items.cart.map((p:IProduct) => {
                    orderProducts.push(p.name)
                    orderImages.push(p.image)
                })
                orderImages.length= orderImages.length > 4 ? 4 : orderImages.length
                const obj = {
                    date,
                    price,
                    products: orderProducts.join(" + "),
                    images: orderImages,
                    id: o._id,
                }
                ordersArr.push(obj) 
            })
            setOrders(ordersArr)})
        .catch(err => console.log(err))
        }
    },[])

    return (
        <>
        <PrivateRoutes>
            <Head>
                <title>Mis compras | DelBosqueBordados-Tienda</title>
            </Head>
            <Navbar categories={categories} />
            <Container>
                <Title>Mis compras</Title>
                <Wrapper>
                {orders.length > 0 ? orders.map((o, indice) => (
                    <ProductContainer key={'myorder'+o.date+indice} onClick={() => router.push('/user/myorder/'+o.id)}>
                        <ImageContainer>
                        <Image src={o.images[0]} alt=""/>
                    </ImageContainer>
                    <WrapperOrder>
                    <ProductTitle>{o.date}</ProductTitle>
                    <Category>{o.products}</Category>
                    <Price>{o.price}</Price>
                    </WrapperOrder>
                    </ProductContainer>
                )) : <ProductTitle style={{margin: '.5rem 2rem'}}>No has hecho ninguna compra todavia :(.</ProductTitle> }
                </Wrapper>
            </Container>
            <Footer />
        </PrivateRoutes>
        </>
    )
}

export default UserOrders

export const getStaticProps:GetStaticProps = async() => {
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return {props: {categories: {lines, types}}}
  }