import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Products from '../components/products'
import SingleProduct from '../components/singleProduct'
import Welcome from '../components/welcome'
import useSingleProductModal from '../hooks/useSingleProductModal'
import { getAllCategories } from '../services/categories'
import { getAll, getFeaturedProducts } from '../services/products'
import { getAllTypes } from '../services/types'
import { useAppSelector } from '../store/hooks'
import { ICategory } from '../types/categories'
import { IProduct } from '../types/product'
import { IType } from '../types/types'


const Home: NextPage = ({products, categories}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const [singleProduct, setsingleProduct] = useState<any>({})
  const [welcome, setWelcome] = useState(false)
  const {user} = useAppSelector(state => state.userReducer)
  useSingleProductModal(setsingleProduct)

    useEffect(()=>{
      if(user && localStorage.first){
        setWelcome(true)
        setTimeout(()=>{
          setWelcome(false)
          localStorage.removeItem('first')
        }, 3000)
      }
    }, [user])
  return (
    <>
      <Head>
            <title>Inicio | Del Bosque Bordados - Tienda</title>
            <meta name="description" content="Pequeños objetos bordados, hechos a mano. Envíos a todo el país por Correo Argentino"></meta>
            <meta property="og:image" itemProp="image" content='https://res.cloudinary.com/delbosque-tienda/image/upload/c_scale,h_299/v1639889237/dbblogo_pyw94n.png' />
      </Head>
      <Layout categories={categories}>
      {!!router.query.singleproduct && <SingleProduct product={singleProduct}/>}
      <Products title='Productos destacados' products={products}/>
      </Layout>
      {welcome && <Welcome />}
    </>
  )
    
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const products:IProduct[] = await getFeaturedProducts()
  const lines:ICategory[] = await getAllCategories()
  const types:IType[] = await getAllTypes()
  return {props: {products: products, categories: {lines: lines, types: types}}}
}
