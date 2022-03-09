import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Head from 'next/head'
import { UpdateFavorites } from '../../store/actions/favorites'
import { useRouter } from 'next/router'
import { useEffect, useState} from 'react'
import { getAllCategories } from '../../services/categories'
import { getAllTypes } from '../../services/types'
import { GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from 'next'
import { useAppSelector } from '../../store/hooks'
import { IProduct } from '../../types/product'
import { ICategory } from '../../types/categories'
import { IType } from '../../types/types'
import PrivateRoutes from '../../components/privateRoutes'
import SingleProduct from '../../components/singleProduct'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

const Container = styled.div`
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
    background-color: white;
    border-radius: 30px;
    width: 100%;
    min-height: 10rem;
    padding: 1rem 2rem;
`
const ProductBox = styled.div`
    position: relative;
`
const ProductContainer = styled.div`
    display:flex;
    flex-direction:row;
    margin: 1rem 1rem;
    width: 20rem;
    cursor: pointer;

    &:hover{
        opacity: 0.7;
    }
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
const Price = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 13.9px;
    line-height: 17px;
    color: black;
`
const InteractiveWrapper = styled.div`
    position: absolute;
    right: 1rem;
    top: 0.8rem;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`
const DeleteProduct = styled.div`
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
    color: black;
    transform: rotate(45deg);
    cursor: pointer;
`

const UserFavorites:NextPage = ({categories}:InferGetStaticPropsType<typeof getStaticProps>) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const products = useAppSelector(state => state.productsReducer)
    const { user } = useAppSelector(state => state.userReducer)
    const mapFavorites = (arr:any) => arr.length > 0 ?
        arr.map((p:string) => products.filter((elemento:IProduct) => p === elemento._id)[0]) : null ;  
    const favorites = useAppSelector(state => mapFavorites(state.favoritesReducer))

    const [singleProduct, setsingleProduct] = useState<any>({})
    
    useEffect(() => {
      if(router.query.singleproduct){
        const product = products.filter((p:IProduct) => p._id === router.query.singleproduct)[0]
        setsingleProduct(product)
      } 
    },[router.query])
    
    const handleRemoveProduct = (product:IProduct) => dispatch(UpdateFavorites(product.id, user))

    const handleProductDetail = (id:string) => {
        router.push('/user/myfavorites?singleproduct=' + id, '/product/'+id, { shallow: false , scroll: false })
    }

    return (
        <PrivateRoutes>
        <Head>
            <title>Mis Favoritos | DelBosqueBordados-Tienda</title>
        </Head>
        <Navbar categories={categories} />
        <Container>
            <Title>Mis Favoritos</Title>
            <Wrapper>
                {Array.isArray(favorites) && typeof favorites[0] !== 'undefined' ? 
                    (favorites.map(product => 
                        (<ProductBox key={`favorite${product.id}`}><ProductContainer onClick={() => handleProductDetail(product.id)}>
                    <ImageContainer>
                        <Image src={product.image} alt=""/>
                    </ImageContainer>
                    <DescWrapper>
                        <ProductTitle>{product.name}</ProductTitle>
                        <Category>{product.category}</Category>
                        <Price>${product.price}</Price>
                    </DescWrapper>
                </ProductContainer><InteractiveWrapper>
                        <DeleteProduct onClick={(e) => handleRemoveProduct(product)}>+</DeleteProduct>
                    </InteractiveWrapper></ProductBox>))) : (<ProductTitle style={{marginTop: '.5rem'}}>No tienes ningún favorito por el momento :(</ProductTitle>)
                }

            </Wrapper>
        </Container>
        <Footer />
        {!!router.query.singleproduct && <SingleProduct product={singleProduct}/>}   
        </PrivateRoutes>
    )
}

export default UserFavorites

export const getStaticProps: GetStaticProps = async() => {
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return {props: {categories: {lines, types}}}
  }