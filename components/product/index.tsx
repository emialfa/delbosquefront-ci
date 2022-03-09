import styled from 'styled-components'
import favIconOff from '../../public/assets/fav-btn.svg'
import favIConOn from '../../public/assets/fav-btn-on.svg'
import { useState, useEffect } from 'react'
import { UpdateFavorites } from '../../store/actions/favorites'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IProduct } from '../../types/product'
import { useAppSelector } from '../../store/hooks'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

const Container = styled.div`
    display:flex;
    flex-direction:column;
    width: 166px;
    /*height: 231px;*/
    background: #FFFFFF;
    border-radius: 15px;
    margin: 10px;
    cursor: pointer;

    &:hover{
        box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
    }
`
const ImageContainer = styled.div`
    display: flex;
    margin: 0px 0px 10px 0px;
    /*padding: 10px;*/
    width: 100%;
    height: 144px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    border-radius: 15px 15px 0px 0px;
    z-index: 0;
`

const Title = styled.h3`
    font-weight: 800;
    font-size: 13.9px;
    line-height: 17px;
    color: #000000;
    margin: 2px 12px;
`
const Category = styled.p`
    font-weight: 300;
    font-size: 11px;
    line-height: 107.3%;
    margin: 2px 12px;
`
const FootContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: auto;
`
const Price = styled(Title)`
    margin: 12px 15px;
`
const FavButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    width: 40px;
    cursor: pointer;
`
const FavImg = styled.div`
    display: flex;
`

const WrapperNotification = styled.div`
  position: absolute;
  margin-left: 31px;
  margin-top: 227px;
  z-index: 7;
  animation-name: notification;
  animation-duration: 1s;
`
const Triangle = styled.div`
    display: flex;
    transform: translate(106px, 3px);
    width: 0;
    height: 0;
    border-right: 9px solid transparent;
    border-top: 0px solid transparent;
    border-left: 9px solid transparent;
    border-bottom: 15px solid #99877D;
    justify-content: flex-end;
`
const Notification = styled.div`
  padding: 8px 17px;
  color: white;
  background: #99877d;
  border-radius: 15px;
  font-weight: 800;
  font-size: 16px;
  line-height: 20px;
`
interface Props {
    product:IProduct;
    admin?:string; 
    handleDelete?:(id:string) => void;
}

const Product: React.FC<Props> = ({product, admin, handleDelete}) => {
    const dispatch = useDispatch()
    const [hideNotification, setHideNotification] = useState(false);
    const [url, seturl] = useState({})
    const router = useRouter()
    const favorito = (arr: string[]) => {if (Array.isArray(arr)){
        return (arr.indexOf(`${product?.id}`, 0) >= 0 ? true : false)}}
    const favorites = useAppSelector((state) => favorito(state.favoritesReducer))
    const {user} = useAppSelector((state) => state.userReducer)
    
    const toggleFav = () => {
        !favorites && setHideNotification(true)
        dispatch(UpdateFavorites(product.id, user))
        setTimeout(()=>{
            setHideNotification(false)
          }, 1000)
    }
    useEffect(() => {
        const newUrl = {
            pathname: router.pathname,
            query: {
                ...router.query,
                singleproduct: product._id
            }
        }
        seturl(newUrl)
    },[router.query])

    const handleProductDetail = (id:string) => {
        router.push(url, `/product/${product._id}`, {shallow: true, scroll: false})
    }
    return (
        <Container data-test-id='product'>
            <ImageContainer className='image-container' onClick={() => handleProductDetail(product._id)}>
                <Image src={product.image+""} alt={product.name} layout="fill" className='image' />
            </ImageContainer>
            <Title onClick={() => handleProductDetail(product._id)}>{product.name}</Title>
            <Category onClick={() => handleProductDetail(product._id)}>{'"'+product.category+'"'}</Category>
            <FootContainer>
                <Price onClick={() => handleProductDetail(product._id)}>${product.price}</Price>
                {admin ? <FavButton className='hover' onClick={() => handleDelete ? handleDelete(product._id+""): ''}>  
                <FavImg style={{display:"flex"}}>
                    <Image src={admin} alt="Delete" />
                </FavImg>
                </FavButton> :
                    <FavButton className='hover image-container' onClick={toggleFav}>
                    <FavImg style={favorites ? {display:"none"} : {display:"flex"}}><Image src={favIconOff} alt="Add to favorites"/></FavImg>
                    <FavImg style={favorites ? {display:"flex"} : {display:"none"}}><Image src={favIConOn} alt="Remove of favorites" /></FavImg>
                </FavButton>
                }
            </FootContainer>
        {hideNotification &&
         <WrapperNotification>
            <Triangle />
            <Notification>¡Agregado a mis favoritos!</Notification>
        </WrapperNotification>}
        </Container>
    )
}

export default Product











