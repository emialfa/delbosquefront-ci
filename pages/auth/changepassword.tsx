import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import Layout from '../../components/layout'
import Products from '../../components/products'
import { getAllCategories } from '../../services/categories'
import { getAll } from '../../services/products'
import { getAllTypes } from '../../services/types'
import { userChangePassword } from '../../services/users'
import { ICategory } from '../../types/categories'
import { IProduct } from '../../types/product'
import { IType } from '../../types/types'

const Background = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    background: rgba(196, 196, 196, 0.58);
    top: 0px;
    left: 0px;
`

const WrapperChangePassword = styled.form`
    position:fixed;
    width: 346px;
    background: #99877D;
    box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
    border-radius: 23.7209px;
    top:50%;
    left:50%;
    display: flex;
    flex-direction: column; 
    align-items:center;
    padding: 3rem 0px 1rem 0px;
    z-index: 2;
    transform: translate(-50%, -50%);
`

const Notification = styled.p`
    color: wheat;
    position: absolute;
    width: 300px;
    text-align: center;
    top: 13px;
`

const InputWrapper = styled.div`
    margin-bottom: 20px;
`

const TitleChangePassword = styled.div`
    font-style: normal; 
    font-weight: 800; 
    font-size: 17.1429px; 
    line-height: 21px;
    color: #FFFFFF;
    margin-bottom: 13px;
`

const Input = styled.input`
    background: #FFFFFF;
    border-radius: 20px; 
    width:235px;
    height:26px;
    border:0px;
    outline: none;
    text-indent: 20px;
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 15px;
    color: #000000;
`

const Submit = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background: #FFFFFF;
    border-radius: 30px;
    margin: 1rem 0px 1.5rem 0px;
    cursor: pointer;
    border: none;
    color: #99877D;
`
const Close = styled.img`
    top: 17px;
    right: 21px;
    position: absolute;
    cursor: pointer;
    z-index: 3;
`

const Authchangepassword: NextPage = ({categories, products}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter()
    const password = useRef<HTMLInputElement>(null)
    const rePassword = useRef<HTMLInputElement>(null)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const handleChangePassword = async () => {
        if(password.current?.value !== rePassword.current?.value){
            setError(true);
            setMessage('Las contraseñas no coinciden');
            return null;
        }
        if ((`${password.current?.value}`).length < 5 || (`${rePassword.current?.value}`).length < 5){
            setError(true);
            setMessage('La contraseña debe tener más de 4 caracteres')
        }
        else {
            const form = {
                password: password.current?.value,
                newPassword: rePassword.current?.value,
            }
            userChangePassword(form, `${router.query.token}`)          
            .then(res => {
                setError(true)
                setMessage('¡Contraseña modificada!')
                setTimeout(() => {
                    router.push('/auth/login')
                }, 1000)
            })
            .catch(err => console.log(err))
        }
    }
    
    return (
        <>
        <Layout categories={categories}>
        <Background></Background>
        <WrapperChangePassword autoComplete="off">
            <Close src="/assets/x.png" alt="" onClick={() => router.push('/')}></Close>
            <InputWrapper>
                <TitleChangePassword>Nueva contraseña</TitleChangePassword>
                <Input type='password' ref={password}></Input>
            </InputWrapper>
            <InputWrapper>
                <TitleChangePassword>Repita nueva contraseña</TitleChangePassword>
                <Input type='password' ref={rePassword}></Input>
            </InputWrapper>
            <Submit onClick={handleChangePassword}>Cambiar contraseña</Submit>
            <Notification>{error && message}</Notification>
        </WrapperChangePassword>
        <Products products={products} title='Todos los productos'/>
        </Layout>
        </>
    )
}

export default Authchangepassword

export const getStaticProps: GetStaticProps = async () => {
    const lines:ICategory[] = await getAllCategories()
    const types:IType[] = await getAllTypes()
    const products:IProduct[] = await getAll()
    return {props: {products, categories: {lines, types}}}
  }