import styled from "styled-components";
import whatsappIcon from '../../public/assets/whatsappIcon.svg'
import Image from 'next/image'

const Container = styled.div``  
 
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(196, 196, 196, 0.58);
  top: 0px;
`;
const Wrapper = styled.div`
  position: fixed;
  width: 355px;
  height: 260px;
  background: #ffffff;
  box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
  border-radius: 23.7209px;
  top: 50%;
  left: 50%;
  margin-top: -130px;
  margin-left: -182.5px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-style: normal;
  font-weight: 800;
  font-size: 20.609px;
  line-height: 25px;
  color: black;
  margin: 4rem 0rem 0.2rem 3rem;
`;

const Option = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 1rem 1rem 0rem 5rem;
    cursor: pointer;

    &:hover {
        opacity: 0.4;
    }
`
const SubTitle = styled.h3`
    font-style: normal;
  font-weight: 800;
  font-size: 20.609px;
  line-height: 25px;
  color: black;
  margin-bottom: 0rem;
`
const Img = styled.div`
    display: flex;
    width: 28px;
    margin-right: 15px;
`

const Close = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 31.609px;
  line-height: 25px;
  color: black;
  transform: rotate(45deg);
  position: absolute;
  top: 9px;
  right: 14px;
  cursor: pointer;

  &:hover{
      opacity: 0.5;
  }
`
const Notification = styled.p`
    font-weight: 300;
    color: black;
    font-size: 12px;
    margin-top: auto;
    padding: 0px 17px;
`

interface Props {
    handleClick: (e:any) => void;
    handleClose: () => void;
}
const PaymentOptions:React.FC<Props> = ({handleClick, handleClose}) => {
    return (
        <Container>
            <Background onClick={handleClose}/>
            <Wrapper>
                <Close onClick={handleClose}>+</Close>
                <Title>Acordar pago por:</Title>
                <Option onClick={handleClick}>
                    <Img><Image src={whatsappIcon} alt='Whatsapp' width={28} height={28} /></Img>     
                    <SubTitle>Whatsapp</SubTitle>
                </Option>
                <Notification>{'Al pulsar sobre la opción su compra se efectuará y quedará guardada en el menú "Mi cuenta > Mis compras". Si desea cancelarla luego puede hacerlo sin costo.'}</Notification>
            </Wrapper>
            
        </Container>
    )
}

export default PaymentOptions
