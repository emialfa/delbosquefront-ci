import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAppSelector } from "../store/hooks"
import { IProduct } from "../types/product"

function useSingleProductModal(setsingleProduct:any) {
    const router = useRouter()
    const allProducts = useAppSelector(state => state.productsReducer)

    useEffect(() => {
        if(router.query.singleproduct){
            const product = allProducts.filter((p:IProduct) => p._id === router.query.singleproduct)[0]
            setsingleProduct(product)
        } else {
            setsingleProduct({})
        }
    },[router.query])
}

export default useSingleProductModal