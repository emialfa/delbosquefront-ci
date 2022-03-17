import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const NavWrapper = styled.div`
    display: grid;
    grid-template-columns: 30% 40% 30%;
    margin: 4rem .5rem 5rem .5rem;
`

const NavTitle = styled.div`
    font-style: normal;
    font-weight: 800;
    font-size: 23px;
    line-height: 28px;
    cursor: pointer;
    text-align: center;
    margin: 0px 1rem;

    @media (max-width: 890px){
        font-size: 20px;
    }
`

const Image = styled.img<{display:boolean}>`
    cursor: pointer;
    opacity: ${props => props.display ? 1 : 0};
    width: 17px;

    &:hover {
        opacity: 0.6;
    }
`

const Navbar:React.FC = () => {
    const router = useRouter()
    return (
        <NavWrapper>
                <div style={{display: 'flex', justifyContent:'center'}}>
                <Link href='/admin/products'>  
                <a>
                <NavTitle className={router.pathname == '/admin/products' ? 'link active' : 'link no-active'}>Productos</NavTitle>
                </a>
                </Link>
                <Link href='/admin/products?new=product'>  
                <a  className='link' style={{display:'flex'}}>
                <Image src="/assets/addProduct.svg" alt='new product' display={router.pathname.indexOf('products') >= 0}/>
                </a>
                </Link>
                </div>
                <Link href='/admin/categories'> 
                <a style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <NavTitle className={router.pathname == '/admin/categories' ? 'link active' : 'link no-active'}>Categorias</NavTitle>   
                </a>        
                </Link>
                <Link href='/admin/orders' > 
                <a>
                <NavTitle className={router.pathname == '/admin/orders' ? 'link active' : 'link no-active'}>Pedidos</NavTitle> 
                </a>      
                </Link>
            </NavWrapper>
    )
}

export default Navbar