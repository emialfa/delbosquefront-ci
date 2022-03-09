import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Layout from '../../../components/layout';
import Products from '../../../components/products';
import { getAllCategories } from '../../../services/categories';
import { getOneProduct } from '../../../services/products';
import { getAllTypes } from '../../../services/types';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { IProduct } from '../../../types/product';
import { ICategory } from '../../../types/categories';
import { IType } from '../../../types/types';
import SingleProduct from '../../../components/singleProduct';
import { useAppSelector } from '../../../store/hooks';


const Category: NextPage = ({products, categories}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter()
    const {name} = router.query
    const [singleProduct, setsingleProduct] = useState<any>({})
    const allProducts = useAppSelector(state => state.productsReducer)
    
    useEffect(() => {
      if(router.query.singleproduct){
        const product = allProducts.filter((p:IProduct) => p._id === router.query.singleproduct)[0]
        setsingleProduct(product)
      } 
    },[router.query])

  return (
    <>
        <Head>
            <title>{`${name === 'all' ? 'Todos los productos' : name} | Del Bosque Bordados - Tienda`}</title>
            <meta name="description" content="Conocé las diferentes lineas de productos de DelBosqueBordados. ¡Se renuevan continuamente!"></meta>
            <meta property="og:image" itemProp="image" content='https://res.cloudinary.com/delbosque-tienda/image/upload/c_scale,h_299/v1639889237/dbblogo_pyw94n.png' />
        </Head>
        <Layout categories={categories}>   
         <Products products={products} title={name === 'all' ? 'Todos los productos' : `${name}`} />
        </Layout>
        {!!router.query.singleproduct && <SingleProduct product={singleProduct}/>}
    </>
  );
};

export default Category;

export const getStaticProps: GetStaticProps= async ({params}) =>  {
  const products:IProduct[] = await getOneProduct('?category='+encodeURIComponent(`${params?.name ===  'all' ? '' : params?.name}`))
  const lines:ICategory[] = await getAllCategories()
  const types:IType[] = await getAllTypes()
  return {props: {products, categories: {lines, types}}}
}

export async function getStaticPaths() {
    const categories:ICategory[] = await getAllCategories()
    const paths = categories.map((p) => ({
        params: { name: p.name },
      }))
    paths.push({params: {name: 'all'}})
      return { paths, fallback: false }
}

