import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { IProduct } from '../../types/product'
import { useRouter } from 'next/router'

const Li = styled.li`
    display: flex;
    align-items: center; 
    padding: 10px 10px;
    cursor: pointer;

    &:hover{
        background-color: rgba(0, 0, 0, 0.05);
    }
`
const ImageContainer = styled.div`
    width: 70px;
    height: 60px;
    margin: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
`
const Img = styled.img`
    height: 100%;
    object-fit: cover;
    object-position: center center;
    width: 100%;
`

const Container = styled.div`
    font-size:13.9px;
    color: #000000;
    padding:0px;
    margin-left:15px;
`
const Title = styled.p`
    line-height: 17px;
    font-weight: 800; 
    margin-bottom:0px;
`
const Category = styled.p`
    font-size: 11.5px;
    line-height: 1.25;
    margin-bottom:0px;
    font-weight: 400;
`
const Price = styled.p`
    font-weight: 800;
    margin-top: 7px;
    line-height: 1.3;
    margin-bottom:0px;
`
interface Props {
    product: IProduct;
    admin?: boolean;
}

const SearchProducts: React.FC<Props> = ({product, admin}) => {
    const router = useRouter()
    const [url, seturl] = useState({})
    
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
        if(admin) return router.push(url, url,{shallow: true})
        router.push(url, `/product/${product._id}`, {shallow: true})
    }
    return (
        <Li onClick={(e) => handleProductDetail(product._id)}>
            <ImageContainer>
                <Img src={`${product.image.substring(0, product.image.search('upload')+7)+'c_scale,w_70/'+product.image.substring(product.image.search('upload')+7)}`} alt={product.name} />
            </ImageContainer>
            <Container>
                <Title>{product.name}</Title>
                <Category>{product.category}</Category>
                <Price>${product.price}</Price>
            </Container>
        </Li>
    )
}

export default SearchProducts
