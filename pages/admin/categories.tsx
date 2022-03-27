import Topbar from "../../components/admin/topbar"
import Navbar from "../../components/admin/navbar"
import React from 'react'
import styled from 'styled-components'
import { useRouter } from "next/router"
import EditCategory from "../../components/admin/editCategory"
import { NextPage } from "next"
import { useAppSelector } from "../../store/hooks"
import { IType } from "../../types/types"
import { ICategory } from "../../types/categories"
import PrivateRoutes from "../../components/privateRoutes"
import Head from "next/head"

const Container = styled.div`    
    display: flex;
    flex-direction: column;
    margin: 0px 8%;
`
const CategoriesContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 3rem .5rem;
`
const Title = styled.div`
    font-style: normal;
    font-weight: 800;
    font-size: 23px;
    line-height: 28px;
    color: #000000;
    margin: 0px;
    width: 2rem;
`

const Categories = styled.div<{color:string, icon:string}>`
    background-color: white;
    border-radius: 6px;
    font-style: normal;
    font-weight: 800;
    font-size: 13.9px;
    line-height: 17px;
    color: #000000;
    padding: 7px 23px;
    border-bottom: ${props => props.color ? `6px solid ${props.color}` : '6px solid #99877D'};
    margin: 0px 10px 20px 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover{
        background-color: ${props => props.color ? `${props.color}` : '#99877D'};
        background-image: ${props => props.icon ? `url(${props.icon})` : 'none'};
        background-position: center;
        background-repeat: no-repeat;
        background-size: 20px;
        background-position: 50% 80%;
        color: transparent;
    }
`
  
const WrapperCategories = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0px .5rem 0px 7rem;
    flex-wrap: wrap;
`

const Add = styled.div`
    margin-left: 2rem;
    color: black;
    font-weight: 800;
    font-size: 23px;
    line-height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 20px;
`
const CategoriesPage: NextPage = () => {
    const typesList = useAppSelector(state => state.typesReducer)
    const categoriesList = useAppSelector(state => state.categoriesReducer)
    const router = useRouter()

    return (
        <PrivateRoutes admin={true}>
             <Head>
                <title>Admin: Categorías | DelBosqueBordados-Tienda</title>
            </Head>
            <Topbar />
            <Navbar />
            <Container>
                <CategoriesContainer>
                    <Title>Tipos</Title>
                    <WrapperCategories>
                        {typesList.map((t:IType) => <Categories key={`${t._id}`} icon={`${t.icon}`} color={`${t.color}`}
                        onClick={(e)=> router.push(`/admin/categories?type=${t._id}`)}>{t.name}</Categories>)}
                        <Add onClick={() => router.push('/admin/categories?new=Tipo')}>+</Add>
                    </WrapperCategories>
                </CategoriesContainer>
                <CategoriesContainer>
                    <Title>Líneas</Title>
                    <WrapperCategories>
                        {categoriesList.map((c:ICategory) => <Categories key={`${c._id}`} icon={`${c.icon}`} color={`${c.color}`} 
                        onClick={(e)=> router.push(`/admin/categories?category=${c._id}`)}>{c.name}</Categories>)}
                        <Add onClick={() => router.push('/admin/categories?new=Línea')}>+</Add>
                    </WrapperCategories>
                </CategoriesContainer>
            </Container>
            {(router.query.category || router.query.type || router.query.new) && <EditCategory />}
        </PrivateRoutes>
    )
}

export default CategoriesPage