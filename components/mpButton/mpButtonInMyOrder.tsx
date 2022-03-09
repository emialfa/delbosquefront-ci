import {useEffect, useRef} from 'react'
import useMP from '../../hooks/useMP'
import styled from 'styled-components';

const MP = styled.div`
    display: flex !important;
    justify-content: center !important;
    flex-direction: column !important;
    margin: 20px auto 10px !important;
    &:hover {
        opacity: 0.7 !important;
    }
`

interface Props {
    orderMPPreferenceId: string;
}

const MPButton:React.FC<Props> = ({orderMPPreferenceId}) => {
    const mercadoPagoButton = useRef<HTMLDivElement>(null)
    const generateMPScript = useMP
    
    useEffect(() => {
        const script = generateMPScript(`${orderMPPreferenceId}`)
        mercadoPagoButton.current ? mercadoPagoButton.current.innerHTML = "" : "";
        mercadoPagoButton.current?.appendChild(script);
    },[])


    return (
        <>
            <MP ref={mercadoPagoButton} className='mporder'>Pagar con Mercadopago</MP>
        </>   
    )
}

export default MPButton;