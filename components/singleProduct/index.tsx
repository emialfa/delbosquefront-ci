import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFavorites } from '../../store/actions/favorites'
import { newLocalProduct } from "../../store/actions/cart";
import Head from 'next/head'
import { useRouter}  from 'next/router'
import Image from 'next/image'
import { useAppSelector } from "../../store/hooks";
import { IProduct } from "../../types/product";

const Container = styled.div``;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(196, 196, 196, 0.58);
  top: 0px;
  z-index: 1;
`;
const Wrapper = styled.div`
  position: fixed;
  width: 346px;
  box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
  border-radius: 23.7209px;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  z-index: 2;
  transform: translate(-50%, -50%);
`;

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem 3rem 1rem 3rem;
  border-radius: 0px 0px 23.7209px 23.7209px;
  background-color: white;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
`;
const TitlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3<{fontSize:number}>`
  font-style: normal;
  font-weight: 800;
  font-size: ${props => props.fontSize? '18.609px' : '20.609px'};
  line-height: 25px;
  color: black;
  margin-bottom: 0.2rem;
`;
const Category = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16.3093px;
  line-height: 107.3%;
  color: #868686;
`;
const FavButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 3px;
  cursor: pointer;
  margin-top: -0.9rem;
  margin-right: 13px;
`;
const FavImg = styled.img`
  object-fit: cover;
  object-position: center center;
  transition: transform .3s ease;

  &:hover{
    opacity: 0.7;
    transform: scale(1.1);
  }
`

const ShareImg = styled(FavImg)<{on:number}>`
    width: 16px;
    padding-bottom: ${props => props.on ? '4px' : '4px'};
    margin-right:  ${props => props.on ? '13px' : '3px'};
    margin-left: ${props => props.on ? '-10px' : '0px'};
`
const Desc = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 14.2326px;
  line-height: 107.3%;
  color: #868686;
  margin-top: 1.6rem;
  margin-bottom: 1.3rem;
  white-space: pre-line;
`;
const Price = styled.h3`
  font-style: normal;
  font-weight: 800;
  font-size: 20.609px;
  line-height: 25px;
  color: black;
`;
const AddToCart = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 45px;
  text-align: center;
  background: #99877d;
  border-radius: 11.8605px;
  white-space: nowrap;
  color: white;
  margin-top: 1rem;
  cursor: pointer;
  transition: transform 0.5s, box-shadow 0.5s, opacity 0.3s ease;

  &:hover{
    transform: scale(1.05);
    box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
  }

  &:active{
      opacity: .7;
      transform: scale(1.05);
      box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
    }
`;
const Close = styled.img`
  top: 18px;
  right: 18px;
  position: absolute;
  cursor: pointer;
  z-index: 3;
  width: 18.99px;
  height: 18.99px;

  &:hover{
    opacity: 0.5;
  }
`;

const Slider = styled.div`
    position: relative;
`

const GuideButtonsWrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 0;
    margin-right: 15%;
    margin-bottom: 1rem;
    margin-left: 15%;
    list-style: none;
`

const GuideButton = styled.div<{opacity:number}>`
    border-top: 0px solid transparent;
    border-bottom: 0px solid transparent;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    opacity: ${(props) => props.opacity};
    box-sizing: content-box;
    flex: 0 1 auto;
    padding: 0;
    margin-right: 3px;
    margin-left: 3px;
    text-indent: -999px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
`

const CarouselImg = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 23.7209px 23.7209px 0px 0px;
`

const ImgContainer = styled.div<{slideIndex:number}>`
    height: 279px;
    position: relative;
    transform: translateX(${(props) => props.slideIndex * 100}%);
    float: left;
    width: 100%;
    margin-right: -100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: transform .6s ease-in-out;
`

const ButtonLeftContainer = styled.div`
    cursor: pointer;
    left: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    padding: 0;
    color: #fff;
    text-align: center;
    background: 0 0;
    border: 0;
    opacity: .5;
    transition: opacity .15s ease;

    &:hover{
        opacity: 1;
    }
`
const ButtonLeft = styled.span`
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e");
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
`
const ButtonRightContainer = styled.div`
    cursor: pointer;
    right: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    padding: 0;
    color: #fff;
    text-align: center;
    background: 0 0;
    border: 0;
    opacity: .5;
    transition: opacity .15s ease;

    &:hover{
        opacity: 1;
    }
`
const ButtonRight = styled.span`
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
`

const WrapperNotification = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -113px;
  margin-top: 258px;
  z-index: 7;
  animation-name: notification;
  animation-duration: 1s;
`
const Triangle = styled.div`
    display: flex;
    transform: translate(103px, 3px);
    width: 0;
    height: 0;
    border-right: 9px solid transparent;
    border-top: 0px solid transparent;
    border-left: 9px solid transparent;
    border-bottom: 15px solid #99877D;
    justify-content: flex-end;
`
const Notification = styled.div`
  padding: 8px 35px;
  color: white;
  background: #99877d;
  border-radius: 15px;
  font-weight: 800;
  font-size: 16px;
  line-height: 20px;
`

const WrapperNotification1 = styled(WrapperNotification)`
  margin-left: 5px;
  margin-top: 65px;
`
const Triangle1 = styled(Triangle)`
  transform: translate(106px, 3px);
`
const Notification1 = styled(Notification)`
  padding: 8px 17px;
  white-space: nowrap;
`

const WrapperShared = styled(WrapperNotification1)`
  animation: none;
`
const Triangle2 = styled(Triangle1)`
    transform: translateX(70px);
`
const SharedOptions = styled(Notification1)`
  transform: translateX(36px);
  padding: 8px 10px;
`
const SharedImg = styled.img`
    margin: 7px 7px;
    width: 20px;
    transition: transform .3s ease;

    &:hover {
      opacity: 0.5;
      transform: scale(1.1);
    }
`
interface Props {
    product: IProduct;
    closeUrl?: boolean;
}

const SingleProduct:React.FC<Props> = ({product, closeUrl}) => {
  const router= useRouter()
  const [slideIndex, setSlideIndex] = useState(0);
  const [hideNotification, setHideNotification] = useState(false);
  const [hideFavNotification, setHideFavNotification] = useState(false);
  const [hideShare, setHideShare] = useState(false)
  const dispatch = useDispatch()

  const favorito = (arr: any) => {if (Array.isArray(arr)){
    return (arr.indexOf(product._id, 0) >= 0 ? true : false)}}
  const favorites = useAppSelector((state) => favorito(state.favoritesReducer))
  const {user} = useAppSelector((state) => state.userReducer)
  console.log(product)
  const toggleFav = () => {
    !favorites && setHideFavNotification(true)
    dispatch(UpdateFavorites(product._id, user))
    setTimeout(()=>{
      setHideFavNotification(false)
    }, 1000)
}

  const handleClick = (direction:string) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : product.images.length);
    } else {
      setSlideIndex(slideIndex < product.images.length ? slideIndex + 1 : 0);
    }
  };

  const handleClose = () => {
        if (!closeUrl) {
           router.back();
        } else {
          router.push("/")
        }
  }
  
  const handleNotification = () => {
    setTimeout(()=>{
      setHideNotification(false)
    }, 750)
}

  const handleSharedWsp = () => {
    window.open("https://api.whatsapp.com/send/?text="+ encodeURIComponent(window.location.href),'_blank', 'noopener')
  }

  const handleSharedFb = () => {
    window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(window.location.href), '_blank', 'noopener')
  }

  return (
    <>{Boolean(Object.keys(product).length) ? <>
    <Head>
        <meta property="og:url" content='delbosquebordados.com.ar' />
        <meta property="og:type" content='article' />
        <meta property="og:title" content={`${product.name} - ${product.category}`} />
        <meta property="og:image" itemProp="image" content={`${product.image.substring(0, product.image.search('upload')+7)+'c_scale,w_290/'+product.image.substring(product.image.search('upload')+7)}`}/>
        <meta property="og:description" content={`Prendedor de forma circular. Medidas 25mm x 25mm`} />
        <title> {`${product.name} - ${product.category}`} | Del Bosque Bordados - Tienda</title>
        <meta name="description" content='Prendedor de forma circular. Medidas 25mm x 25mm'></meta>
    </Head>
    <Container key={`single${product.id}`}>
      <Background onClick={handleClose}/>
      (<><Wrapper key={`singleproduct${product.id}`}>
        <Slider>
            <GuideButtonsWrapper>
                <GuideButton onClick={() => setSlideIndex(0)} opacity={slideIndex === 0 ? 1 : .5} />
            {Array.isArray(product.images) ? product.images.map((p:string, indice:number) => (
                <GuideButton key={'guidebutton'+indice} onClick={() => setSlideIndex(indice+1)} opacity={slideIndex === indice+1 ? 1 : .5}></GuideButton>
                )) : console.log('error')}
            </GuideButtonsWrapper>
            <CarouselImg >
                <ImgContainer className='image-container' slideIndex={0 - slideIndex}>
                    <Image src={product.image} alt={product.name} layout="fill" className='image' ></Image>
                </ImgContainer>
                {Array.isArray(product.images) ? product.images.map((p:string, indice:number) => (
                     <ImgContainer key={'image'+indice+p} className='image-container' slideIndex={indice+1 - slideIndex}>
                     <Image layout="fill" alt={product.name} className='image' src={p}></Image>
                 </ImgContainer>
                )) : console.log('error')}
            </CarouselImg>
            <ButtonLeftContainer>
                <ButtonLeft onClick={() => handleClick("left")}></ButtonLeft>
            </ButtonLeftContainer>
            <ButtonRightContainer>
                <ButtonRight onClick={() => handleClick("right")}></ButtonRight>
            </ButtonRightContainer>
        </Slider>
        <DescWrapper>
          <Top>
            <TitlesWrapper>
              <Title fontSize={product.name.length > 17 ? 1 : 0}>{product.name}</Title>
              <Category>{'"'+product.category+'"'}</Category>
            </TitlesWrapper>
            <FavButton>
              <ShareImg src='/assets/shareIcon.svg' on={favorites ? 1 : 0} onClick={() => setHideShare(!hideShare)} />
              {hideShare &&  <WrapperShared>
                <Triangle2 />
                <SharedOptions><SharedImg src='/assets/whatsappIconWhite.svg' onClick={handleSharedWsp}/><SharedImg src='/assets/facebookIconWhite.svg' onClick={handleSharedFb} /></SharedOptions>
              </WrapperShared>}
              <div onClick={toggleFav}>
              <FavImg
                src='/assets/fav-btn.svg'
                style={favorites ? { display: "none" } : { display: "block" }}
              ></FavImg>
              <FavImg
                src='/assets/fav-btn-on.svg'
                style={favorites ? { display: "block", paddingBottom: '3px' } : { display: "none" }}
              ></FavImg></div>            
              {hideFavNotification && 
              <WrapperNotification1>
                <Triangle1 />
                <Notification1>¡Agregado a mis favoritos!</Notification1>
              </WrapperNotification1>}
            </FavButton>
          </Top>
          <Desc><>{product.description.replace('<br>', '\n')}</></Desc>
          <Price>${product.price}</Price>
          <AddToCart onClick={() => {setHideNotification(true); dispatch(newLocalProduct(product, user)); handleNotification()}}>Agregar al carrito</AddToCart>
      {hideNotification &&
      <WrapperNotification>
      <Triangle />
      <Notification>¡Agregado al carrito!</Notification>
      </WrapperNotification>}
        </DescWrapper>
        <Close onClick={handleClose} src='/assets/cerrar.svg' alt="Close" />
      </Wrapper></>)
    </Container>
    </> : 'No hay product aun'}</>
  );
};

export default SingleProduct;
