import Topbar from "../../components/admin/topbar"
import Navbar from "../../components/admin/navbar"
import styled from 'styled-components'
import {useState, useEffect} from 'react'
import Product from '../../components/product'
import Search from '../../components/search'
import LinesBar from '../../components/admin/linesbar'
import { deleteProduct, getProducts } from '../../services/admin'
import { useRouter } from "next/router"
import EditProduct from "../../components/admin/editProduct"
import { IProduct } from "../../types/product"
import { NextPage } from "next"
import { useAppSelector } from "../../store/hooks"
import PrivateRoutes from "../../components/privateRoutes"

const ProductsContainer = styled.div`
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

const ProductsPage:NextPage = () => {
    const router = useRouter()
    const [products, setProducts] = useState<IProduct[]>([])
    const categories = useAppSelector(state => state.categoriesReducer)
    const {user} = useAppSelector(state => state.userReducer)

    useEffect(()=>{
        const search = new URLSearchParams(window.location.search)
        console.log(search.toString())
        if(router.query.singleProduct) search.delete('singleProduct')
        if(router.query.category === 'all') search.delete('category')
        getProducts('?'+search.toString())
        .then((res:IProduct[]) => setProducts([...res]))
        .catch((err:any) => console.log(err))
    },[router.query])

    const handleDelete = async (id:string) => {
        await deleteProduct(id, user)        
        .then(async () => { 
            await getProducts(window.location.search)
            .then((res:IProduct[]) => setProducts([...res]))
            .catch((err:any) => console.log(err))
        })
        .catch((err:any) => console.log(err))
    }

    return (
        <PrivateRoutes admin={true}>
            <Topbar />
            <Navbar />
            <Search admin={true}/>
            <LinesBar categories={{lines: categories, types:[]}}/>
            <ProductsContainer>
                <Title>{router.query.category ? router.query.category === 'all' ? 'Todos los productos' : router.query.category : 'Todos los productos'}</Title>  
                <Wrapper>
                    { products.map((p) => 
                        (<Product product={p} handleDelete={handleDelete} key={`products${p.id}`} />)
                    )}
                </Wrapper>
            </ProductsContainer>
            {(router.query.singleproduct || router.query.new) && <EditProduct />}
        </PrivateRoutes>
    )
}

export default ProductsPage