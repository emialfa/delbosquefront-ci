import React, {useState } from 'react'
import styled from 'styled-components'
import {userEmailResetPassword } from '../../services/users'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'
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

const Resend = styled.div<{disabled:boolean}>`
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

const Notification = styled.div`
    font-weight: 800;
    font-size: 18px;
    line-height: 22px;
    color: #99877D;
    margin: 0px auto;
`

const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    margin: 1rem;
}
`
const NameData = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 17px;
    line-height: 21px;
    color:black;
    margin-right: 1rem;
    margin-bottom: 1rem;
`
const InputData = styled.input`
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 20px;
    color:black;
    margin-top: -1rem;
    border: none;
    padding: 5px 20px;
    text-decoration: none;
    border: 1px solid black;
    border-radius: 15px;
`
const UserResetPassword: NextPage = ({categories}:InferGetStaticPropsType<typeof getStaticProps>) => {
    const email = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(false)

    const handleReSendMail = async () => {
        setMessage('Se ha enviado el mail a la dirección registrada.')
        setDisabled(true)
        const form = { email: email.current?.value }
        userEmailResetPassword(form)
        .then(res => {
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
                <title>Reestablecer contraseña | Del Bosque Bordados - Tienda</title>
            </Head>
            <Layout categories={categories}>
            <Container>
            <Title>Reestablecer contraseña</Title>
            <Wrapper>
                <Message>Para reestablecer tu contraseña especificanos el correo electrónico con el que te registraste y te enviaremos un mail a esa dirección:</Message> 
                <Row>
                    <NameData>Email:</NameData>  
                    <InputData autoFocus type='email' ref={email}></InputData>
                </Row>
                <Resend onClick={handleReSendMail}  disabled={disabled}> Enviar email</Resend> 
                <Notification>{message}</Notification>
            </Wrapper>
            </Container>
            </Layout>
        </>
    )
}

export default UserResetPassword

export const getStaticProps: GetStaticProps = async () =>  {
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    return {props: {categories: {lines, types}}}
  }