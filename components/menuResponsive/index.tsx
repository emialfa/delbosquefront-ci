import { useState } from 'react'
import { useSelector } from 'react-redux'
import Link  from 'next/link'
import styled from 'styled-components'
import ig from '../../public/assets/ig-logo-menu.svg'
import { device } from '../../responsive'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../store/hooks'
import { IType } from '../../types/types'
import { ICategory } from '../../types/categories'

const Container = styled.div<{hide: boolean}>`
    position: absolute;
    left: 0px;
    top: 88px;
    z-index: 1000; 
    display: none;
    @media ${device.laptop} {
        display: ${(props) => props.hide ? 'flex' : 'none'};
    }
`

const Triangle = styled.div`
    display:flex;
    position: absolute;
    top: 0px;
    left: 31px;
    width: 0;
    height: 0;
    border-right: 9px solid transparent;
    border-top: 0px solid transparent;
    border-left: 9px solid transparent;
    border-bottom: 15px solid #99877D;
    justify-content: flex-end;  
`
const Wrapper = styled.div`
    display: flex;
    background: #99877D;
    border-radius: 30px;
    position: absolute;
    top: 12px;
    left: 0px;
    width: 432px;
    z-index: 1000;   
`
const Ul = styled.ul`
     margin-bottom:0px;
     padding:90px 40px;
     color:#FFF5EB;
     width: 336px;
`
const Li = styled.li`
    list-style: none;
    text-align: left;
    padding: 20px 50px 20px 20px;

    &:hover{
        color: rgba(255, 245, 235, 0.8);
    }
`
const IgContainer = styled.a`

`
const Submenu = styled.div`
    margin-left: 20px;
`
const Arrow = styled.div<{$hide:number}>`
	margin: ${(props) => props.$hide ? '5px 0px 0px 0px' : '15px 0px -15px 0px'};
	width: 10px;
	height: 10px;
	box-sizing: border-box;
	transform: ${(props) => props.$hide ? 'rotate(-45deg)' : 'rotate(135deg)'};
	content: '';
	border-width: .4vmin .4vmin 0 0;
	border-style: solid;
	display: block;
	transform-origin: 100% 0;
    float: right;
`
const Arrow2 = styled(Arrow)<{$hide: number}>`
    margin: ${(props) => props.$hide ? '5px 66px 0px 0px' : '15px 66px -15px 0px'};
`
interface Props {
    hide: boolean;
    setHide: (state:boolean) => void;
    handleLogout: () => void;
    categories: {
        lines: ICategory[];
        types: IType[];
    }
}
const MenuResponsive: React.FC<Props> = ( {hide, setHide, handleLogout, categories} ) => {
    const router = useRouter()
    const {user} = useAppSelector(state => state.userReducer)
    const [hideMiCuenta, setHideMiCuenta] = useState(false)
    const [hideProducts, setHideProducts] = useState(false)
    const [hideType1, setHideType1] = useState('')
    const [hideCategories, setHideCategories] = useState(false)

    const handleSelectType = (t:IType) => {
        setHideType1(hideType1 === t.name ? '' : t.name);
        if (t.categories.length === 0){
            router.push('/products/'+t.name);
            setHide(!hide)
        }
    }
    return (
        <Container hide={hide} className='animate-fadeInDown'>
            <Triangle />
            <Wrapper>
                <Ul>
                    <Link href='/'>
                    <a onClick={(e) => setHide(false)}>
                    <Li>Inicio</Li>
                    </a>
                    </Link>
                    <Li onClick={()=> setHideProducts(!hideProducts)}>Productos</Li>
                    {hideProducts &&
                    <Submenu>
                        {categories.types.map((t, indice) => 
                           (<><Li key={'types'+t+indice} onClick={()=> handleSelectType(t)}>{t.name} {t.categories.length > 0 && <Arrow $hide={hideType1 === t.name ? 1 : 0}/>}</Li> 
                    {hideType1 === t.name &&
                    <Submenu>
                        {t.categories.map((c, indice )=> 
                        (<Link key={`menuProductsCategories${indice}`}  href={`/products/${t.name}&category=${c}`}> 
                        <a className='link' onClick={(e) => setHide(false)}>
                        <Li key={`menuProductsCategories${c}`}>{c}</Li>
                        </a>
                        </Link>))}
                        </Submenu>}</>))}
                    </Submenu>}
                    <Li onClick={()=> setHideCategories(!hideCategories)}>Categorías</Li>
                    {hideCategories && <Submenu>
                    {categories.lines.map((c) => 
                        (<Link key={'category'+c} href={`/category/${c.name}`}>
                            <a onClick={(e) => setHide(false)}>
                            <Li>{c.name}</Li>
                            </a>
                        </Link>))} 
                    </Submenu>}
                    <Link href='/contact'>
                    <a onClick={(e) => setHide(false)}>
                    <Li>Contacto</Li>
                    </a>
                    </Link>
                    {user ? 
                    <>
                    <Li onClick={()=> setHideMiCuenta(!hideMiCuenta)}>Mi Cuenta  <Arrow2 $hide={hideMiCuenta ? 1 : 0}/></Li>
                        {hideMiCuenta &&
                        <Submenu>
                        <Link href='/user/myfavorites'> 
                        <a onClick={(e) => setHide(false)}>
                        <Li>Mis Favoritos</Li>
                        </a>
                        </Link>
                        <Link href='/user/myorders' >
                        <a onClick={(e) => setHide(false)}>
                        <Li>Mis compras</Li>
                        </a>
                        </Link>
                        <Link href='/user/myconfig'>
                        <a onClick={(e) => setHide(false)}>
                        <Li>Mis datos</Li>
                        </a>
                        </Link>
                        <Li onClick={() => {setHide(false);handleLogout()}}>Cerrar Sesión</Li>
                        </Submenu>
                        }
                    </> :
                    <>
                    <Link href='/auth/register'>
                    <a onClick={(e) => setHide(false)}>
                    <Li>Registrarse</Li>
                    </a>
                    </Link>
                    <Link href='/auth/login'>
                    <a onClick={(e) => setHide(false)}>
                    <Li>Ingresar</Li>
                    </a>
                    </Link>
                    </>
                    }
                    <Li className='hover' onClick={(e) => setHide(false)}>
                    <IgContainer href="https://www.instagram.com/del.bosque.bordados/"  target="_blank" rel="noopener noreferrer">
                        <Image src={ig} alt='Instagram'/>
                    </IgContainer>
                    </Li>
                </Ul>
            </Wrapper>
        </Container>
    )
}

export default MenuResponsive
