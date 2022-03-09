import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userConfirmRegister, userEmailConfirm } from '../../services/users'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { getAllCategories } from '../../services/categories'
import { getAllTypes } from '../../services/types'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { ICategory } from '../../types/categories'
import { IType } from '../../types/types'


const Container = styled.div`
    margin: 1rem 8%;
    display: flex;
    flex-direction: column;
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
    padding: 1rem 2rem;
`

const Title = styled.h1`
    margin-left: 10px;
    font-weight: 800;
    font-size: 23px;
    line-height: 28px;
    color: #000000;
`

const Message = styled.div`
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: black;
    margin: 1rem 2rem;
`

const LinkLogin = styled.a`
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: black;
    margin: 0px;
    padding: 0px;
    cursor: pointer;
    text-decoration: underline;
`

const Resend = styled.div`
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 20px;
    color: white;
    margin: 1rem auto;
    padding: 15px 50px;
    background-color: #99877D;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    cursor: pointer;
`

const Notification = styled.div<{disabled:boolean}>`
    font-weight: 800;
    font-size: 18px;
    line-height: 22px;
    color: #99877D;
    margin: 1rem auto;
`
const UserConfirmReg:NextPage = ({categories}:InferGetStaticPropsType<GetStaticProps>) => {
    const [status, setStatus] = useState(false)
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(false)
    const router = useRouter()
    const search = router.query

    useEffect(() => {    
        if(search.regtoken){
            userEmailConfirm(`${search.regtoken}`)
            .then(res => {
                setStatus(false);
                console.log(res)
                if (res.activation) {
                    router.push("/auth/login")
                }
        })
            .catch(err => console.log(err))
        }
        else if(search.token){
            userConfirmRegister(`${search.token}`)
            .then(res => {
                setStatus(true);
                setTimeout(() => {
                    router.push('/auth/login')
            }, 5000)
        })
            .catch(err => console.log(err))
        }  
    }, [router.query])

    const handleConfirm = async () => {
        setMessage('Se ha reenviado el mail a la dirección registrada.')
        setDisabled(true)
        userEmailConfirm(`${search.regtoken}`)
        .then(res => {
            setStatus(false);
            if (res.activation) {
                router.push("/auth/login")
            }
    })
        .catch(err => console.log(err))
        setTimeout(()=> {
            setMessage('')
            setDisabled(false)
        }, 5000)
    }
    return (
        <>
            <Head>
                <title>Confirmación de usuario | Del Bosque Bordados - Tienda</title>
            </Head>
            <Layout categories={categories}>
            <Container>
            <Title>Confirmación de usuario</Title>
            <Wrapper>
                {status ? 
                <Message>¡Usuario confirmado exitosamente!. <br /> <br />

                En 5 segundos te redireccionaremos a la pagina de login...</Message> : <>
                <Message>Para completar el proceso de registro en la tienda solo falta que nos confirmes tu email.
                Te envíamos un correo a la dirección que especificaste en el registro para que puedas
                confirmar tu cuenta. <br />
                Si ya lo hiciste puedes redirigirte a la pagina de login haciendo click <LinkLogin onClick={() => router.push('/auth/login')}>aqui</LinkLogin>.<br /> <br /> 
                Si no te llegó el mail puedes solicitar que te lo reenviemos haciendo click en este boton: 
                </Message> 
                <Resend onClick={handleConfirm}>Reenviar mail</Resend> 
                <Notification disabled={disabled}>{message}</Notification></>
                }
            </Wrapper>
            </Container>
            </Layout>
        </>
    )
}

export default UserConfirmReg

export const getStaticProps:GetStaticProps = async () => {
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return {props: {categories: {lines, types}}}
  }