import React from 'react'
import styled from 'styled-components'
import sorteoImg from '../../public/assets/bienvenides.svg'
import Image from 'next/image'

const Container = styled.a`
    display:flex;
    justify-content: center;
    align-items: center;
    background: #99877D;
    margin: 3rem auto;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    width: 45%;
    height: 110px;
    cursor: pointer;

    @media (max-width: 900px) {
        width: 80%; 
    }
`
const ImageContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    cursor: pointer;
`

const Footer = () => {
    return (
        <footer style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Container href="https://www.instagram.com/del.bosque.bordados/" target="_blank" rel="noopener noreferrer">    
            <ImageContainer>
                <Image src={sorteoImg} alt='¡Welcome!' />
            </ImageContainer>
        </Container>
        </footer>
    )
}

export default Footer
