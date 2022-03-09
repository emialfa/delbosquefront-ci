import styled from 'styled-components'
import whatsappIcon from '../public/assets/whatsappIcon.svg'
import igIcon from '../public/assets/igIcon.svg'
import Head from 'next/head'
import Image from 'next/image'
import { getAllCategories } from '../services/categories'
import { getAllTypes } from '../services/types'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { ICategory } from '../types/categories'
import { IType } from '../types/types'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

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
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: white;
    border-radius: 30px;
    width: 100%;
    min-height: 10rem;
    padding: .5rem 2rem 1.2rem 2rem;

    @media (max-width: 565px){
        padding: 0.5rem 0rem 1.2rem 0rem;
    }
`
const Desc = styled.div`
    color: black;
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 20px;
    margin: 2rem 2rem 1rem 2rem;
`
const IconsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`
const WhatsappContainer = styled.a`
    padding: 5px 20px;
    border: .5px solid #30AE25;
    border-radius: 10px;
    margin: 0px 1rem;
    cursor: pointer;
    display: flex;

    &:hover{
        opacity: 0.5;
    }
`
const IgContainer = styled.a`
    padding: 5px 20px;
    border: .5px solid #C86CCA;
    border-radius: 10px;
    margin: 0px 1rem;
    cursor: pointer;
    display: flex;

    &:hover{
        opacity: 0.5;
    }
`
const Contactpage:NextPage = ({categories}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
        <Head>
            <title>Contacto | Del Bosque Bordados - Tienda</title>
            <meta name='description' content="✨ Pequeños objetos bordados ✨.  🌱 Mi nombre es Belén. 🍄 Bordo a mano. 📬 Envío a todo el país por Correo Argentino. 🔽Mandame WP si tenes alguna consulta." />
            <meta property="og:image" itemProp="image" content='https://res.cloudinary.com/delbosque-tienda/image/upload/c_scale,h_299/v1639889237/dbblogo_pyw94n.png' />
        </Head>
        <Navbar categories={categories} />
        <Container>
            <Title>Contacto</Title>
            <Wrapper>
                <Desc>
                ✨ Pequeños objetos bordados ✨<br/>
                <br/>
                🌱 Mi nombre es Belén<br/>
                🍄 Bordo a mano<br/>
                📬 Envío a todo el país por Correo Argentino<br/>
                🔽 Mandame WP si tenes alguna consulta <br/>
                </Desc>
                <IconsWrapper>
                <WhatsappContainer href='https://api.whatsapp.com/send/?phone=%2B5492914730027&text&app_absent=0'  target="_blank" rel="noopener noreferrer"><Image src={whatsappIcon} width={15.99} height={15.99} alt='Whatsapp icon' /></WhatsappContainer>
                <IgContainer href="https://www.instagram.com/del.bosque.bordados/"  target="_blank" rel="noopener noreferrer"><Image src={igIcon} width={15.99} height={16.99} alt='Instagram icon' /></IgContainer>
                </IconsWrapper>
            </Wrapper>
        </Container>
        <Footer />
        </>
    )
}

export default Contactpage;

export const getStaticProps: GetStaticProps = async () => {
    const lines: ICategory[] = await getAllCategories()
    const types: IType[] = await getAllTypes()
    return {props: { categories: {lines, types}}}
  }


