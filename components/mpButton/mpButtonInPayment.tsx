import {useEffect, useRef} from 'react'
import { generateMPButton } from '../../services/payment'
import useMP from '../../hooks/useMP'
import { useAppSelector } from '../../store/hooks';
import styled from 'styled-components';

const MP = styled.div`
    &:hover {
        opacity: 0.7 !important;
    }
`
interface Props {
    handlePayment: (e: React.MouseEvent<HTMLDivElement>, mpbutton: boolean) => void;
    MPpreferenceId: React.MutableRefObject<string>;
}

const MPButton:React.FC<Props> = ({handlePayment, MPpreferenceId}) => {
    const { cart, shippingCost, total } = useAppSelector(state => state.cartReducer);
    const generateMPScript = useMP
    const mercadoPagoButton = useRef<HTMLDivElement>(null)
    
    const setScriptInComponent = (preferenceId:string) => {
        const script = generateMPScript(`${preferenceId}`)
        mercadoPagoButton.current ? mercadoPagoButton.current.innerHTML = "" : "";
        mercadoPagoButton.current?.appendChild(script);
    }
    
    useEffect(() => {
        const getMPButton = async () => {
            const obj = {cart: cart, shippingCost: shippingCost}
            const res = await generateMPButton(obj) 
            setScriptInComponent(`${res.preferenceId}`)
            MPpreferenceId.current = res.preferenceId;
        }
        getMPButton()
    },[total])

    return (
        <>
            <MP ref={mercadoPagoButton} className='mppayment' onClick={(e) => handlePayment(e, true)}>Pagar con Mercadopago</MP>
        </>   
    )
}

export default MPButton;