import styled from 'styled-components'
import { IProduct } from '../../types/product'

const Container = styled.div`
    display:flex;
    flex-direction:row;
    margin: 10px 0px;
    height: 80px;
`
const ImageContainer = styled.div`
    display: flex;
    margin: 0px 0px 10px 0px;
    align-items: center;
    justify-content: center;
    width: 92px;
    height: 63px;
`
const ProductImage = styled.img`
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
const Title = styled.h3`
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
const Price = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 13.9px;
    line-height: 17px;
    color: black;
`
const InteractiveWrapper = styled.div`
    display:flex;
    flex-direction:column;
    margin-left: auto;
`
const DeleteProduct = styled.div`
     font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
    color: black;
    transform: rotate(45deg);
    margin-left: auto;
    margin-bottom: 10px; 
    cursor: pointer;
    
    &:hover {
        opacity: 0.7;
    }
`
const QuantityWrapper = styled.div`
    display:flex;
    flex-direction:row;
`
const Decremment = styled.img`
    margin: 0px 5px;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
        opacity: 0.7;
    }
`
const Quantity = styled.div`
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 11.1px;
    color:white;
    justify-content: center;
    display: flex;
    margin: 0px 5px;
    color: black;
    width: 32px;
    align-items: center;
`
const Incremment = styled.img`
    cursor: pointer;
    margin: 0px 5px;
    border-radius: 50%;
    box-shadow: 0px 3.6px 9px rgb(0 0 0 / 25%);
    
    &:hover {
        opacity: 0.7;
    }
`
interface Props{
    product: IProduct;
    handleAddProduct: (product:IProduct) => void;
    handleRemoveOneProduct: (product:IProduct) => void;
    handleRemoveProduct: (product:IProduct) => void;
}
const ProductPayment:React.FC<Props> = ({product, handleAddProduct, handleRemoveOneProduct, handleRemoveProduct}) => {
    return (
        <Container>
            <ImageContainer>
                <ProductImage src={product.image} alt=""/>
            </ImageContainer>
            <DescWrapper>
                <Title>{product.name}</Title>
                <Category>{product.category}</Category>
                <Price>${product.price}</Price>
            </DescWrapper>
            <InteractiveWrapper>
                <DeleteProduct onClick={(e) => handleRemoveProduct(product)}>+</DeleteProduct>
                <QuantityWrapper>
                    <Decremment src='/assets/menosPayment.svg' onClick={(e) => handleRemoveOneProduct(product)}/>
                    <Quantity>{product.quantity < 10 ? `0${product.quantity}` : product.quantity}</Quantity>
                    <Incremment src='/assets/masPayment.svg' onClick={(e) => handleAddProduct(product)}/>
                </QuantityWrapper>
            </InteractiveWrapper>
        </Container>
    )
}

export default ProductPayment
