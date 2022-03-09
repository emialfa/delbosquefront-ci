import styled from 'styled-components'
import { useRouter } from 'next/router'
import { IProduct } from '../../types/product'
import Product from '../product'

const Container = styled.section`
    margin: 0px 8%;
    display: flex;
    flex-direction: column;
`

const Title = styled.h1`
    margin-left: 10px;
    font-weight: 800;
    font-size: 23px;
    line-height: 28px;
    color: #000000;
`

const Wrapper = styled.div`
    display: flex;
    margin: 2rem 0px;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
`
const Message = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 13.9px;
    height: 17px;
    color: black;
    margin-bottom: 3px;
`
interface Props {
    title:string;
    products: IProduct[];}

const Products: React.FC<Props> = ({title, products}) => {
    return (  
        <>
        <Container>
            <Title>{title}</Title>
            <Wrapper>
            {Boolean(products.length) ? products.map((p) => 
                (<Product product={p} key={`products${p._id}`} />)
            ) : <Message>No hay productos por aqui aún, pero habra pronto :D.</Message>}
            </Wrapper>
        </Container> 
        </>
    )
}

export default Products
