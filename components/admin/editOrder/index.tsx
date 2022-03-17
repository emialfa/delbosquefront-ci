import {useEffect, useState, useRef} from 'react'
import { getAdminOneOrder, updateOneOrder } from '../../../services/orders'
import styled from 'styled-components'
import { useRouter } from "next/router"
import { IOrder, IOrderWithItemsList } from '../../../types/order';
import { useAppSelector } from '../../../store/hooks';

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(196, 196, 196, 0.58);
  top: 0px;
  cursor: pointer;
`;
const ContainerPage = styled.div`
`
const Container = styled.div`
    display: flex;
    position: fixed;
    top: 50%;
    left:50%;
    background: white;
    border-radius: 30px;
    padding: 1.5rem;
    overflow-y: auto;
    z-index:1;
    flex-direction: row;
    width: 750px;
    justify-content: center;
    height: 650px;
    margin-top: -325px;
    margin-left: -375px;
    
    @media (max-width: 800px){
        flex-direction: column;
        width: 465px;
        margin-left: -232.5px;
        overflow-y: scroll;
    }
`
const Body = styled.div`
    display: flex;
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
const EditButton = styled.div`
    color: black;
    border-radius: 10px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`
const Select = styled.select`
   margin-bottom: 1rem; 
   padding: 2px 10px;
    font-weight: 300;
    border-radius: 5px;
    margin-top: -4px;
`
const Option = styled.option`
    font-weight: 300;
    border-radius: 5px;
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
const InputText = styled.input`
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 20px;
    color: black;
    border: none;
    padding: 0px;
    text-decoration: none;
`

const EditOrder:React.FC = () => {
    const router = useRouter()
    const {user} = useAppSelector(state => state.userReducer)
    const [order, setOrder] = useState<IOrderWithItemsList>()
    const [editOptions, setEditOptions] = useState(false)
    const selectPayment = useRef<HTMLSelectElement>(null)
    const inputShip = useRef<HTMLSelectElement>(null)
    const trackingCodeRef = useRef<HTMLInputElement>(null)
    const [trackingHide, setTrackingHide] = useState(false)

    useEffect(() => {
        getAdminOneOrder(`${router.query.order}`, user)
        .then((res: IOrderWithItemsList) => {
            res.orderItems= JSON.parse(`${res.orderItems}`);
            setOrder(res)
        })
        .catch((err:any) => console.log(err))
    }, [router.query])

    const handleClose = () => {
        router.push('/admin/orders')
    }

    const handleEdit = (id:string) => {
        const form = {
            paymentStatus: selectPayment.current?.value, 
            MPbutton: selectPayment.current?.value == 'No iniciado' ? true : false,
            status: inputShip.current?.value ? inputShip.current?.value : order?.status,
            trackingCode: order?.trackingCode
        }
        updateOneOrder(id, form, user)
        .then(res => {
            res.orderItems = JSON.parse(res.orderItems)
            setOrder(res)
            setEditOptions(false)
        })
        .catch(err => console.log(err))
    }
    return (
        <>
            <Background onClick={handleClose}/> 
             {order && 
            <Container>
                <CloseButton onClick={handleClose}>+</CloseButton> 
            <Body>
            <Column>
            <Top>
            <Title>Estado de la cuenta</Title>
            <Separator style={{marginBottom: '2rem'}}/> 
                <Row>
                    <NameData>Envío:</NameData>
                    {editOptions ? 
                    <>
                    <Select ref={inputShip} style={{marginLeft: '-10px'}} defaultValue={order?.status}>
                        <Option value="No iniciado">No iniciado</Option>
                        <Option value="Pendiente">Pendiente</Option>
                        <Option value="En camino">En camino</Option>
                        <Option value="Finalizado">Finalizado</Option>
                    </Select>
                </>
                    :
                   <InputData>{order?.status}</InputData>}
                   {order?.status !== 'No iniciado' && order?.status !== 'Pendiente' && order?.status !== 'Finalizado' && <More onClick={() => setTrackingHide(true)} style={{marginTop: '4px'}}>...</More>}
                </Row>
                <Row>
                    <NameData>Pago:</NameData>
                    {editOptions ? <>
                        <Select style={{marginLeft: '-6.5px', padding: '2px 9px'}} defaultValue={order?.paymentStatus == 'No iniciado' ? order?.paymentMPStatus : order?.paymentStatus}> 
                        <Option value="No iniciado">No iniciado</Option>
                        <Option value="En proceso">En proceso</Option>
                        <Option value="Aprobado">Aprobado</Option>
                        </Select>
                    </> :
                   <InputData >{order?.paymentStatus == 'No iniciado' ? order?.paymentMPStatus : order?.paymentStatus}</InputData>}
                </Row>
                <Row>
                    <NameData>Detalle de pago:</NameData>
                   <InputData >{order.paymentStatus == 'No iniciado' ? order.paymentMPStatus_detail : order.paymentStatus}</InputData>
                </Row>
                </Top>
            <Top>
            <Title>Datos del envío</Title>
            <Separator  style={{marginBottom: '2rem'}}/> 
                
                <Row>
                    <NameData>Nombre y Apellido:</NameData>
                   <InputData>{order.name}</InputData>
                </Row>
                <Row>
                    <NameData >Dni/Pasaporte:</NameData>
                   <InputData >{order.document}</InputData>
                </Row>
                <Row>
                    <NameData >Cod. Postal:</NameData>
                   <InputData>{order.zip}</InputData>
                </Row>
                <Row>
                    <NameData >Localidad:</NameData>
                   <InputData >{order.city}</InputData>
                </Row>
                <Row>
                    <NameData >Dirección:</NameData>
                  <InputData>{order.shippingAddress}</InputData>
                </Row>
                <Row>
                    <NameData >Teléfono:</NameData>
                   <InputData>{order.phone}</InputData>
                </Row>
                <Row>
                    <NameData >Email:</NameData>
                    <InputData>{order.email}</InputData>
                </Row>
            </Top>
            </Column>
            <Column>
            <Top>
                <Title>Orden de pago</Title>
                <Separator />
                <ProductsContainer>
                    {order.orderItems.cart.map((p:any,indice:number)=>(
                        <ProductContainer key={p.name+indice}>
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
            <Wrapper style={{justifyContent: 'space-evenly', marginTop: '1rem'}}>
            {editOptions ? <>
            <EditButton onClick={() => handleEdit(order._id)}>Guardar</EditButton>
            <EditButton onClick={() => setEditOptions(false)}>Cancelar</EditButton>
            </> :
            <EditButton onClick={() => setEditOptions(true)}>Editar</EditButton>
            }   
            </Wrapper>  
            </Top>
            </Column>
            </Body>
        </Container>}
        {trackingHide && <>
        <Background />
        <TrackingWrapper>
            <CloseButton style={{position: 'absolute', right: '15px', top: '15px', fontSize: '40px'}} onClick={() => setTrackingHide(false)}>+</CloseButton>
            <Title style={{marginBottom: '1rem'}}>Codigo de seguimiento</Title>
            {editOptions ? 
             <InputText type='text' placeholder={order?.trackingCode ? order?.trackingCode : ''} ref={trackingCodeRef} onChange={(e) => order ? order.trackingCode = e.target.value : null}></InputText> : 
            <InputData>{order?.trackingCode ? order?.trackingCode : 'No se ha especificado aún.'}</InputData>}
        </TrackingWrapper>
        </>}
        </>
    )
}

export default EditOrder