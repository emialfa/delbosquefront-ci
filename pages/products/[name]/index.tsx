import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import Products from '../../../components/products';
import { getAllCategories } from '../../../services/categories';
import { getOneProduct } from '../../../services/products';
import { getAllTypes } from '../../../services/types';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { IType } from '../../../types/types';
import { IProduct } from '../../../types/product';
import { ICategory } from '../../../types/categories';
import SingleProduct from '../../../components/singleProduct';
import { useAppSelector } from '../../../store/hooks';

const ProductsPage:NextPage = ({products, categories}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
         <Products products={products} title={`${name}`.replace("&category=", " - ")}/>
        </Layout>
        {!!router.query.singleproduct && <SingleProduct product={singleProduct}/>}   
    </>
  );
};

export default ProductsPage;

export const getStaticProps: GetStaticProps= async ({params}) =>  {
  const products:IProduct[] = await getOneProduct(`?type=${(`${params?.name}`).replace(" ", "+")}`)
  const lines:ICategory[] = await getAllCategories()
  const types:IType[] = await getAllTypes()
  return {props: {products, categories: {lines, types}}}
}

export const getStaticPaths: GetStaticPaths = async () => {
    const types:IType[] = await getAllTypes()
    const paths = types.map((t) =>  ({params: { name: t.name }})) 
    types.map(t => t.categories.map(c => paths.push({params: { name: `${t.name}&category=${c}`}}))
    )
      return { paths, fallback: false }
}

