import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Head from 'next/head'
import { getOneOrder, sendOrderFromWhatsapp } from '../../../../services/orders'
import PaymentOptions from '../../../../components/paymentOptions'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../../store/hooks'
import { IOrderWithItemsList } from '../../../../types/order'
import { NextPage } from 'next'
import { emptyCart } from '../../../../store/actions/cart'
import MPButton from '../../../../components/mpButton/mpButtonInMyOrder'
import PrivateRoutes from '../../../../components/privateRoutes'
import Navbar from '../../../../components/navbar'
import Footer from '../../../../components/footer'

const Container = styled.div`
    display: flex;
    background: white;
    border-radius: 30px;
    padding: 1.5rem;
    top: 0px;
    right: 0px;
    overflow-y: auto;
    z-index:1;
    margin: 1rem auto;
    flex-direction: row;
    width: 750px;
    justify-content: center;
    
    @media (max-width: 750px){
        flex-direction: column;
        width: 465px;
    }
`
const Top = styled.div`
    margin: 20px 30px;
`
const Close = styled.img`
    margin-bottom: 2rem; 
    cursor: pointer;
`
const Title = styled.h1`
    font-style: normal;
    font-weight: 800;
    font-size: 21px;
    line-height: 26px; 
    color:black;
`
const Separator = styled.div`
    width: 100%;;
    background-color: black;
    height: 1px;
    margin: 1rem 0px 1rem 0px;
`
const ProductsContainer = styled.div`
   margin-top: 2rem;
`
const ProductContainer = styled.div`
   display:flex;
    flex-direction:row;
    margin: 10px 0px;
    height: 80px;
`

const Wrapper = styled.div`
    display:flex; 
    flex-direction:row;
`
const SubTitle = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 21px; 
    color:black;
    margin: 0.5rem 5px;
`
const Price = styled(SubTitle)`
     margin-left:auto;
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
const InputData = styled.div`
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 21px;
    color:black;
    border: none;
    padding: 0px;
    text-decoration: none;
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
`
const ImageContainer = styled.div`
    display: flex;
    margin: 0px 0px 10px 0px;
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
const DescWrapper = styled.div`
    display:flex; 
    flex-direction:column;
    margin-left: 18px;
    width: 170px;
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
const ProductPrice = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 13.9px;
    line-height: 17px;
    color: black;
`
const PaymentButton = styled.div`
    padding: 10px;
    color: black;
    border-radius: 8px;
    border: 1px solid black;
    margin: 10px 5px 0px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover{
        opacity: 0.5;
    }
`
const MP = styled.div`
    font-size: 14px !important;
    background-color: #448CD2 !important;
    border-radius: 8px !important;
    color: white !important;
    cursor: pointer !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 20px auto 10px auto !important;

    &:hover{
        opacity: 0.8;
    }
`
const BuyButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 0px; 
    background: #99877D;
    border-radius: 8px;
    margin: 10px auto 0rem auto;
    font-size: 14px; 
    line-height: 16px;
    color: white;
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`
const More = styled.div`
    padding: 0px 10px 8px 10px;
    border: 1px solid black;
    border-radius: 10px;
    margin-left: auto;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    cursor: pointer;

    &:hover {
        opacity:0.5;
    }
`
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(196, 196, 196, 0.58);
  top: 0px;
  cursor: pointer;
`;

const TrackingWrapper = styled.div`
      background-color: white;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      overflow: auto;
      z-index: 4;
      flex-direction: column;
      box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
      border-radius: 30px;
      padding: 3rem 2rem;
`
const CloseButton = styled.div`
    font-style: normal;
    font-weight: 200;
    font-size: 50px;
    line-height: 17px;
    color: black;
    position: fixed;
    z-index: 6;
    transform: rotate(45deg);
    right: 23px;
    top: 23px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`

const UserSingleOrder:NextPage = () => {
    const router = useRouter()
    const params = router.query
    const dispatch = useDispatch()
    const [order, setOrder] = useState<IOrderWithItemsList>()
    const [buttonPayment,setButtonPayment] = useState(false)
    const [trackingHide, setTrackingHide] = useState(false)
    const [hidePaymentOptions, setHidePaymentOptions] = useState(false)
    const categoriesList = useAppSelector(state => state.categoriesReducer)
    const typesList = useAppSelector(state => state.typesReducer)
    const {user} = useAppSelector(state => state.userReducer)
    const categories = {lines: categoriesList, types: typesList}

    useEffect(() => {
        getOneOrder(`${params.id}`, user)
        .then(res => {
            res.orderItems = JSON.parse(res.orderItems)
            setOrder(res)
            res.paymentMPStatus !== "Aprobado" && res.paymentMPStatus !== "approved" && res.paymentMPStatus !== "in_process" && res.paymentMPStatus !== "Pendiente de aprobación" && res.status !== "Aprobado" ? setButtonPayment(true) : setButtonPayment(false)
        })
        .catch(err => console.log(err))
    },[params.id])

    useEffect(() => {
        if(router.query.payment === 'back') {
            dispatch(emptyCart(user));
            router.replace(`${router.asPath.split('?')[0]}`, undefined, { shallow: true });
        }
    },[])

    const handlePayment = () => {
            sendOrderFromWhatsapp(order?.orderItems.cart, order?.orderItems.subtotal, order?.orderItems.shippingCost, order?.orderItems.total, order, order?.shippingAddress) 
    }

    return (
        <>
        <PrivateRoutes>
            <Head>
                <title>Mi compra | DelBosqueBordados-Tienda</title>
            </Head>
            <Navbar categories={categories} />
                {order && 
            <Container>
            <Column>
            <Top>
            <Title>Estado de la cuenta</Title>
            <Separator style={{marginBottom: '2rem'}}/> 
                <Row>
                    <NameData>Envío:</NameData>
                   <InputData>{order.paymentStatus == 'No iniciado' ||  order.paymentStatus == 'Pendiente de aprobación' ? order.status : order.paymentStatus}</InputData>
                   {order.trackingCode !== 'No se ha especificado aún.' && <More onClick={() => setTrackingHide(true)}>...</More>}
                </Row>
                <Row>
                    <NameData>Pago:</NameData>
                   <InputData >{order.paymentStatus == 'No iniciado' ||  order.paymentStatus == 'Pendiente de aprobación' ? order.paymentMPStatus : order.paymentStatus }</InputData>
                </Row>
               {buttonPayment && <><MPButton orderMPPreferenceId={`${order?.MPPreferenceId}`} />
               <BuyButton onClick={(e) => setHidePaymentOptions(true)}>Acordar pago por otro medio</BuyButton></>}
                </Top>
            <Top>
            <Title>Datos del envío</Title>
            <Separator  style={{marginBottom: '2rem'}}/> 
                
                <Row>
                    <NameData>Nombre y Apellido:</NameData>
                   <InputData>{order?.name}</InputData>
                </Row>
                <Row>
                    <NameData >Dni/Pasaporte:</NameData>
                   <InputData >{order?.document}</InputData>
                </Row>
                <Row>
                    <NameData >Cod. Postal:</NameData>
                   <InputData>{order?.zip}</InputData>
                </Row>
                <Row>
                    <NameData >Localidad:</NameData>
                   <InputData >{order?.city}</InputData>
                </Row>
                <Row>
                    <NameData >Dirección:</NameData>
                  <InputData>{order?.shippingAddress}</InputData>
                </Row>
                <Row>
                    <NameData >Teléfono:</NameData>
                   <InputData>{order?.phone}</InputData>
                </Row>
                <Row>
                    <NameData >Email:</NameData>
                    <InputData>{order?.email}</InputData>
                </Row>
            </Top>
            </Column>
            <Column>
            <Top>
                <Title>Orden de pago</Title>
                <Separator />
                <ProductsContainer>
                    {order.orderItems.cart.map((p)=>(
                        <ProductContainer key={'orderitem'+p.name}>
                        <ImageContainer>
                        <Image src={p.image} alt=""/>
                        </ImageContainer>
                        <DescWrapper>
                        <ProductTitle>{p.name}</ProductTitle>
                        <Category>{p.category}</Category>
                        <ProductPrice>{p.quantity} x ${p.price}</ProductPrice>
                        </DescWrapper>
                        </ProductContainer>                 
                    ))}
                </ProductsContainer>
            <Separator />
            <Wrapper>
                <SubTitle>Subtotal</SubTitle>
                <Price>${order.orderItems.subtotal}</Price>
            </Wrapper>
            <Wrapper>
                <SubTitle>Costo de envío</SubTitle>
                <Price>${order.orderItems.shippingCost}</Price>
            </Wrapper>
            <Separator />
            <Wrapper>
                <SubTitle>Total</SubTitle>
                <Price>${order.orderItems.total}</Price>
            </Wrapper>
            </Top>
            </Column>
        </Container>}
        {trackingHide && <>
        <Background />
        <TrackingWrapper>
            <CloseButton style={{position: 'absolute', right: '15px', top: '15px', fontSize: '40px'}} onClick={() => setTrackingHide(false)}>+</CloseButton>
            <Title style={{marginBottom: '1rem'}}>Codigo de seguimiento</Title>
            <InputData>{order?.trackingCode ? order?.trackingCode : 'No se ha especificado aún.'}</InputData>
        </TrackingWrapper>
        </>}
        {hidePaymentOptions && <PaymentOptions handleClick={(e) => handlePayment()} handleClose={() => setHidePaymentOptions(false)} />}
        <Footer />
        </PrivateRoutes>
        </>
    )
}

export default UserSingleOrder
