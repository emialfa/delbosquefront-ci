import {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { newLocalProduct, removeLocalOneProduct, removeLocalProduct } from '../../store/actions/cart'
import ProductPayment from '../../components/productPayment'
import Head from 'next/head'
import { saveOneOrder, sendOrderFromWhatsapp } from '../../services/orders'
import PaymentOptions from '../../components/paymentOptions'
import { useRouter } from 'next/router'
import { getAllTypes } from '../../services/types'
import { getAllCategories } from '../../services/categories'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { ICategory } from '../../types/categories'
import { IType } from '../../types/types'
import { useAppSelector } from '../../store/hooks'
import { IProduct } from '../../types/product'
import PrivateRoutes from '../../components/privateRoutes'
import MPButton from '../../components/mpButton/mpButtonInPayment'
import Navbar from '../../components/navbar'

const Container = styled.div`
    display: block;
    background: white;
    border-radius: 30px;
    padding: .5rem 1.5rem;
    top: 0px;
    right: 0px;
    overflow-y: auto;
    z-index:1;
    width: 465px;
    margin: 1rem auto;
`
const Top = styled.div`
    margin: 44px 30px 20px 30px;
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
const SubTitleDesc = styled(SubTitle)`
    &:hover{
        opacity: 0.7;
    }
`
const Price = styled(SubTitle)`
    margin-left:auto;
`
const BuyButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 0px; 
    background: #99877D;
    border-radius: 15px;
    margin: 1rem auto 2rem auto;
    font-size: 20px; 
    line-height: 25px;
    color: white;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`

const InputDesc = styled.input`
    border-radius: 20px; 
    height:31px;
    outline: none;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 15px;
    color: #000000;
    margin: 0.5rem 5px;
    width: 310px;
    margin: 0.7rem auto;
    background-image: url('/assets/codDesc.svg');
    background-repeat: no-repeat;
    text-indent: 24px;
    text-align: center;
    border: 0.5px solid lightgrey;
    background-position: 29% 50%;

    &:focus{
        background-image: none;
        text-indent: 0px;
        &::placeholder{
           opacity:0;
        }
    }
`
const PaymentPage:NextPage = ({categories}:InferGetStaticPropsType<typeof getStaticProps>) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const MPpreferenceId = useRef('')
    const [hideDescCod, setHideDescCod] = useState(false)
    const [hidePaymentOptions, setHidePaymentOptions] = useState(false)
    const { cart, subtotal, shippingCost, total } = useAppSelector(state => state.cartReducer);
    const { user } = useAppSelector(state => state.userReducer)
    const cartReducer = useAppSelector(state => state.cartReducer)
    const {shippingAddress} = useAppSelector(state => state.userReducer)
    const handleAddProduct = (product:IProduct) => {
        dispatch(newLocalProduct(product, user));
    }
    const handleRemoveOneProduct = (product:IProduct) => {
        dispatch(removeLocalOneProduct(product, user));
    }
    const handleRemoveProduct = (product:IProduct) => {
        dispatch(removeLocalProduct(product, user));
    }
    
    const handlePayment = (e: React.MouseEvent<HTMLDivElement>, mpbutton: boolean) => {
        if (total > 0){
        const form = {
            orderItems: JSON.stringify(cartReducer),
            name: shippingAddress.name,
            shippingAddress: shippingAddress.street,
            city: shippingAddress.city,
            zip: shippingAddress.zip,
            phone: shippingAddress.phone,
            document: shippingAddress.document,
            email: shippingAddress.email,
            MPbutton: true,
            MPPreferenceId: MPpreferenceId.current
        }
        const saveOrder = async () => {
            if(total > 0){
                saveOneOrder(form, user)
                .then(res => {
                    console.log(res.order._id)
                    setTimeout(() => {
                        if (!mpbutton) sendOrderFromWhatsapp(cart, subtotal, shippingCost, total, shippingAddress, shippingAddress.street) 
                        router.push('/user/myorder/'+res.order._id+'?payment=back')
                    }, 500)
                })
                .catch(err => console.log(err))
            }
        }
        saveOrder()
    }}
        useEffect(() => {
            if (subtotal == 0 || !shippingAddress || !user) {
                router.push('/')
            }              
        }, [total])

        return (
        <PrivateRoutes>   
            <Head>
                <title>Orden de pago | Del Bosque Bordados - Tienda</title>
            </Head>
             <Navbar categories={categories} />
             <Container>
            <Top>
                <Title>Orden de pago</Title>
                <Separator />
                <ProductsContainer>
                    {cart.map((p:IProduct)=>(
                        <ProductPayment product={p} key={`cart${p.id}`} handleAddProduct={handleAddProduct} handleRemoveOneProduct={handleRemoveOneProduct} handleRemoveProduct={handleRemoveProduct} />
                    ))}
                </ProductsContainer>
            <Separator />
            <Wrapper>
                <SubTitle>Subtotal</SubTitle>
                <Price>${subtotal}</Price>
            </Wrapper>
            <Wrapper>
                <SubTitle>Costo de envío</SubTitle>
                <Price>${shippingCost}</Price>
            </Wrapper>
            <Wrapper>
                <SubTitleDesc onClick={() => setHideDescCod(!hideDescCod)} style={{cursor: 'pointer'}}>¿Tenés un codigo de descuento?</SubTitleDesc>
                <Price></Price>
            </Wrapper>
            {hideDescCod && 
             <Wrapper><InputDesc type='text' placeholder='Código Promocional'/></Wrapper>
            }
            <Separator />
            <Wrapper>
                <SubTitle>Total</SubTitle>
                <Price>${total}</Price>
            </Wrapper>    
            <MPButton handlePayment={handlePayment} MPpreferenceId={MPpreferenceId}/>
            <BuyButton onClick={(e) => setHidePaymentOptions(true)}>Acordar pago por otro medio</BuyButton>
            </Top>
        </Container>
        {hidePaymentOptions && <PaymentOptions handleClick={(e) => handlePayment(e, false)} handleClose={() => setHidePaymentOptions(false)} />}
        </PrivateRoutes>
    )
}

export default PaymentPage

export const getStaticProps:GetStaticProps = async() => {
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return {props: {categories: {lines, types}}}
  }