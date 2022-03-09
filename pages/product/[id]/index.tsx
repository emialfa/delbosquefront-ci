import Layout from "../../../components/layout";
import Products from "../../../components/products";
import SingleProduct from "../../../components/singleProduct";
import { getAllCategories } from "../../../services/categories";
import { getAll, getOneProduct } from "../../../services/products";
import { getAllTypes } from "../../../services/types";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { IProduct } from "../../../types/product";
import { ICategory } from "../../../types/categories";
import { IType } from "../../../types/types";

const ProductPage:NextPage = ({product, products, categories}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
          <Layout categories={categories}>
          <Products products={products} title="Todos los productos" />
          </Layout>
          <SingleProduct product={product} closeUrl={true} />
        </>
    )
}

export default ProductPage

export const getStaticProps: GetStaticProps = async ({params}) =>  {
    const products:IProduct[] = await getAll()
    const product:IProduct = await getOneProduct(`${params?.id}`)
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return { props: { products, product, categories: {lines, types} } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages:IProduct[] = await getAll()
  
  const paths = pages.map((p) => ({
    params: { id: p._id },
  }))
  return { paths, fallback: false }
}