import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { addShipping, newLocalProduct, removeLocalOneProduct, removeLocalProduct } from '../../store/actions/cart'
import { useState } from 'react'
import { getApiShippingCost } from '../../services/cart'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../store/hooks'
import { IProduct } from '../../types/product'
import { ISucursalCA } from '../../types/sucursalCA'
import Image from 'next/image'
import ProductCart from '../productCart'


const Container = styled.div<{hide: number}>`
    display: ${(props) => props.hide ? 'block' : 'none'};
    background: #99877D;
    border-radius: 30px 0px 0px 0px;
    width: 411px;
    height: 100%;
    position: fixed;
    top: 0px;
    right: 0px;
    overflow-y: auto;
    z-index:1;
`
const Top = styled.div`
    margin: 44px 30px;
`
const Close = styled.div`
    margin-bottom: 2rem; 
    cursor: pointer;

    &:hover{
        opacity: 0.7;
    }
`
const Title = styled.h1`
    font-style: normal;
    font-weight: 800;
    font-size: 21px;
    line-height: 26px; 
    color:white;
`
const Separator = styled.div`
    width: 100%;;
    background-color: white;
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
const SubTitle = styled.div`
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 21px; 
    color:white;
    margin: 0.5rem 5px;
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
    background: #FFFFFF;
    border-radius:15px;
    margin: 2rem auto;
    font-size: 20px; 
    line-height: 25px;
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`

const InputZip = styled.input`
    background: #FFFFFF;
    border-radius: 20px; 
    width:80px;
    height:31px;
    border:0px;
    outline: none;
    text-indent: 20px;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 15px;
    color: #000000;
    margin: 0.5rem 5px;
`
const InputDesc = styled(InputZip)`
    width: 276px;
    margin: 0.7rem auto;
    background-image: url('/assets/codDesc.svg');
    background-repeat: no-repeat;
    text-indent: 20px;
    text-align: center;
    border: 0;
    background-position: 26% 50%;

    &:focus{
        background-image: none;
        text-indent: 0px;
        &::placeholder{
           opacity:0;
        }
    }
`
const Arrow = styled.div<{hide: number}>`
	margin: ${(props) => props.hide ? '5px -26px 0px 0px' : '15px -26px -15px 0px'};
    float: right;
	width: 10px;
	height: 10px;
	box-sizing: border-box;
	transform: ${(props) => props.hide ? 'rotate(-45deg)' : 'rotate(135deg)'};
	content: '';
	border-width: .4vmin .4vmin 0 0;
	border-style: solid;
	display: block;
	transform-origin: 100% 0;
`

const Arrow2 = styled(Arrow)<{hide:number}>`
    display: ${props => props.hide ? 'block' : 'none'};
`
interface Props {
    hide: boolean;
    setHide: (state:boolean) => void;
}
const Cart: React.FC<Props> = ( {hide, setHide}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [hideShippingInput,setHideShippingInput] = useState(false)
    const [hideDescCod,setHideDescCod] = useState(false)
    const { cart, subtotal, shippingCost, zip, city, total } = useAppSelector(state => state.cartReducer);
    const { user } = useAppSelector(state => state.userReducer)
    const handleAddProduct = (product:IProduct) => {
        dispatch(newLocalProduct(product, user));
    }
    const handleRemoveOneProduct = (product:IProduct) => {
        dispatch(removeLocalOneProduct(product, user));
    }
    const handleRemoveProduct = (product:IProduct) => {
        dispatch(removeLocalProduct(product, user));
    }
    const handleZip = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        const zipValue = value
        zipValue.length === 4 && getApiShippingCost(zipValue).then((res: ISucursalCA[]) => {
            const codPostalNumber:number = +(res[0].codpostal);
            res.length > 0 ?
            res[0].codpostal !== '8000' ? dispatch(addShipping(420, codPostalNumber, res[0].localidad)) : dispatch(addShipping(0, codPostalNumber, res[0].localidad))
            : dispatch(addShipping(0, 0 , 'Sin sucursal'))})
        .catch(err => console.log(err))
    }
    const handleClose = () => {
        const component = document.querySelector('.animate-fadeInRight');
        component?.classList.add('animate-fadeOutRight')
        setTimeout(() => {
            setHide(false);
        },300)
    }
    return (
        <Container data-testid="container" hide={hide ? 1 : 0} className='animate-fadeInRight'>
            <Top>
                <Close onClick={handleClose}><Image src="/assets/cerrar.svg" alt='Close' width={13} height={13}></Image></Close>
                <Title>Mi Carrito</Title>
                <Separator />
                <ProductsContainer>
                    {cart.map((p:IProduct)=>(
                        <ProductCart product={p} key={`cart${p.id}`} handleAddProduct={handleAddProduct} handleRemoveOneProduct={handleRemoveOneProduct} handleRemoveProduct={handleRemoveProduct} />
                    ))}
                </ProductsContainer>
            <Separator />
            <Wrapper>
                <SubTitle>Subtotal</SubTitle>
                <Price>${subtotal}</Price>
            </Wrapper>
            <Wrapper className='hover'>
                <SubTitle onClick={() => setHideShippingInput(!hideShippingInput)}  style={{cursor: 'pointer'}} >Calcular costo de envío<Arrow hide={hideShippingInput ? 1 : 0}/></SubTitle>
                <Price>${shippingCost}</Price>
            </Wrapper>
            {hideShippingInput &&
            <Wrapper style={{alignItems: 'center'}}>
                <SubTitle style={{display: 'flex', alignItems: 'center', fontSize: '17px', marginLeft: '17px', whiteSpace: 'nowrap' }}>Cod Postal</SubTitle>
                <InputZip type='tel' placeholder={zip+""} onChange={handleZip}/>
                <Price style={{fontWeight: '300', display: 'flex', alignItems: 'center', textAlign: 'center'}}>{city}</Price>
            </Wrapper>}
            <Wrapper className='hover'>
                <SubTitle style={{cursor: 'pointer'}} onClick={() => setHideDescCod(!hideDescCod)}>¿Tenés un codigo de descuento? <Arrow2 hide={hideDescCod ? 1 : 0}/></SubTitle>
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
                <BuyButton onClick={() => subtotal > 0 && user ? router.push('/order/shipping') : subtotal > 0 ? router.push('/auth/login') : setHide(false)}>Comprar</BuyButton>
            </Top>
        </Container>
    )
}

export default Cart
