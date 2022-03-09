import styled from "styled-components"
import MenuResponsive from "../menuResponsive"
import { device } from "../../responsive"
import { useDispatch } from "react-redux"
import { useState } from "react"
import React from 'react'
import Link  from 'next/link'
import { logout } from "../../store/actions/user"
import MiCuenta from "../miCuenta"
import MenuProducts from "../menuProducts"
import MenuCategories from "../menuCategories"
import Image from 'next/image'
import Cart from "../cart"
import { initLocalCart } from "../../store/actions/cart"
import { useRouter } from "next/router"
import { ICategory } from "../../types/categories"
import { IType } from "../../types/types"
import { useAppSelector } from "../../store/hooks"

const Container = styled.header`
    width: 100%;
    margin-bottom:4rem;
`;

const Topbar = styled.div`
    width: 100%;
    background-color: white;
    padding:.8rem;
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 22px;
    color: #99877D;
    text-align: center;
    display: flex;
    flex-direction:row;
    justify-content: center;
`

const Shipping = styled.div`
    margin: 0px 7px;
`
const Wrapper = styled.nav`
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 17.5% 22.5% 20% 22.5% 17.5%;

    @media ${device.laptop} {
        grid-template-columns: 10% 80% 10%;
    }
`;

const Left = styled.div`
    display: flex;
    text-align:center;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    position: relative;

    @media ${device.laptop}{
        justify-content: center;  
    }
`
const Cleft = styled.ul`
    margin: 0px;
    display:flex;
    padding-inline-start: 0px;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    
    @media ${device.laptop} {
        display:none;
    }
`
const Li = styled.li`
    list-style: none;
    text-align: center;
    cursor: pointer;
`
const Li2 = styled(Li)`
    &:hover{
        opacity: 0.7;
    }
`

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const Cright = styled(Cleft)`
`
const Right = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const Ig = styled.a`
    display:flex;
    
    &:hover{
        opacity: 0.5;
    }

    @media ${device.laptop} {
        display:none;
    }
`

const Menu = styled.div<{hide:number}>`
    display:none;
    opacity: ${props => props.hide ? 0.5 : 1};

    @media ${device.laptop} {
        display: flex;
        justify-content: flex-end;
        padding-left:0px;
    }
`

const CartContainer = styled.div`
    display:flex; 
    flex-direction:column; 
    justify-content:center;
    align-items:center;

    &:hover{
        opacity: 0.5;
    }
    @media ${device.laptop}{
        padding-right:0px;
        align-items: center; 
    }
`
const ProductsCart = styled.div`
    font-size: 1rem;
    padding-left: 0.2rem; 
    margin-bottom:0px;
    line-height: 1.2;
    display:block;
    text-align: center;
`

const CartIcon = styled.div`
    display:flex; 
    justify-content:center;
    align-items:center;
`

const LoginContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin-right: 2.5rem;
`

const H3 = styled.h3`
    font-weight: 800;
    font-size: 17.1429px;
    line-height: 21px;
    margin: 0px 7px 0px 0px;

    &:hover{
      color: rgba(153, 135, 125, 0.68);
    }
`

const H3Micuenta = styled.h3 `
    font-weight: 800;
    font-size: 17.1429px;
    line-height: 21px;
    margin: 0px 7px 0px 0px;
`

const Arrow = styled.div<{hide:number}>`
	margin: ${(props) => props.hide ? '0px 20px 0px 0px;' : '24px 20px 0px 0px;'};
	width: 13px;
	height: 13px;
	box-sizing: border-box;
	transform: ${(props) => props.hide ? 'rotate(-45deg)' : 'rotate(135deg)'};
	content: '';
	border-width: .4vmin .4vmin 0 0;
	border-style: solid;
	display: block;
	transform-origin: 100% 0;
`

const Arrow2 = styled(Arrow)<{hide:number}>`
	margin: ${(props) => props.hide ? '4px 0px 0px 0px;' : '0px'};
    display: ${(props) => props.hide ? 'flex' : 'none'};
`
interface Props {
    categories: {
        lines: ICategory[],
        types: IType[]
    }
}
const Navbar: React.FC<Props> = ({categories}) => {
    const [hideMenu, setHideMenu] = useState(false);
    const [hideCart, setHideCart] = useState(false);
    const [hideMiCuenta, setHideMiCuenta] = useState(false)
    const [hideProducts, setHideProducts] = useState(false)
    const [hideCategories, setHideCategories] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch();
    const {cantProducts, total} =  useAppSelector(state => state.cartReducer);
    const {user} = useAppSelector(state => state.userReducer)
    const handleLogout = () => {
        dispatch(logout(user))
        setHideMiCuenta(false);
        dispatch(initLocalCart())
        window.location.replace(window.location.origin)
    };
    const handleCart = () => {
        setHideCart(!hideCart)
    };
    const handleMenu = () => {
        const component = document.querySelector('.animate-fadeInDown');
        component?.classList.add('animate-fadeOutDown')
        setTimeout(() => {
            setHideMenu(!hideMenu)
        },200)
    }

    return (
        <Container>
            <Topbar><Shipping><Image src="/assets/shippingIcon.svg" alt="Shipping" width={20} height={20} /></Shipping>¡Envíos a todo el país por correo argentino!<Shipping><Image src="/assets/shippingIcon.svg" alt="Shipping" width={20} height={20} /></Shipping></Topbar>
            <Wrapper>
                <Left>
                    <Ig href="https://www.instagram.com/del.bosque.bordados/"  target="_blank" rel="noopener noreferrer">
                    <Image src="/assets/ig-logo.svg" alt="Instagram" width={24} height={24}/></Ig>
                    <Menu className='link hover' hide={hideMenu ? 1 : 0}><Image src="/assets/menu.svg" alt="Menu" onClick={handleMenu} width={22} height={18}/></Menu>
                    <MenuResponsive hide={hideMenu} setHide={setHideMenu} handleLogout={handleLogout} categories={categories}/>
                </Left>
                <Cleft>
                    <Link href='/'>
                        <a className='link hover'>
                    <Li>Inicio</Li>
                        </a>
                    </Link>
                    <Li style={{display: 'flex', justifyContent: 'center'}}>
                        <H3 onClick={() => setHideProducts(!hideProducts)}>Productos</H3>
                        <Arrow2 hide={hideProducts ? 1 : 0} onClick={() => setHideProducts(!hideProducts)} />
                        <MenuProducts hide={hideProducts} setHide={setHideProducts} categories={categories}/>
                    </Li>
                    <Li style={{display: 'flex', justifyContent: 'center'}}>
                        <H3 onClick={() => setHideCategories(!hideCategories)}>Categories</H3>
                        <Arrow2 hide={hideCategories ? 1 : 0} onClick={() => setHideCategories(!hideCategories)} />
                        <MenuCategories hide={hideCategories} setHide={setHideCategories} categories={categories}/>
                    </Li>
                </Cleft>
                <Center className='link hover'>
                    <Link href="/">
                    <a className='link'>
                        <Image src="/assets/delbosque-logo.svg" alt="Logo" width={102} height={83} onClick={() => router.push('/')} />  
                    </a>     
                    </Link>            
                </Center>
                <Cright>
                    <Link href='/contact'>
                        <a className='link hover'>
                        <Li>Contacto</Li>
                        </a>
                    </Link>
                    {user ? (
                        <LoginContainer>
                        <Li2 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setHideMiCuenta(!hideMiCuenta)}>
                            <H3Micuenta>Mi cuenta</H3Micuenta>
                            <Arrow hide={hideMiCuenta ? 1 : 0} />
                        </Li2>
                        <MiCuenta hide={hideMiCuenta} setHide={setHideMiCuenta} handleLogout={handleLogout}/>
                        </LoginContainer>
                     ) : (
                         <>
                        <Link href='/auth/register'>
                            <a className='link hover'>
                            <Li>Registro</Li>
                            </a>
                        </Link>
                        <Link href='/auth/login'>
                            <a className='link hover'> 
                            <Li>Login</Li>  
                            </a>
                        </Link>
                        </>)
                    }
                </Cright>
                <Right>
                    <CartContainer onClick={handleCart}>
                        <ProductsCart>{cantProducts > 0 ?  `(${cantProducts}) $${total}` : ''}</ProductsCart>
                        <CartIcon>
                        <Image src="/assets/cart-logo.svg" alt="Cart" width={30} height={26}/>
                        </CartIcon>
                    </CartContainer>
                </Right>
            </Wrapper>
            <Cart hide={hideCart} setHide={handleCart}/>
        </Container>
    )
}

export default Navbar
