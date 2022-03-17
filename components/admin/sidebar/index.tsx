import { useState } from 'react'
import  Link  from 'next/link'
import styled from 'styled-components'

const Container = styled.div<{hide:boolean}>`
    display: ${props => props.hide ? 'flex' : 'none'};
    position:fixed;
    top:0px;
    left:0px;
    background-color: #99877D;
    width: 245px;
    height: 100%;
    flex-direction: column;
    z-index: 4;
`
const Close = styled.img`
    margin: 1rem 1rem 1rem auto;
    cursor: pointer;
    width: 15px;

    &:hover{
        opacity: 0.7;
    }
`
const Wrapper = styled.div`
    padding: 2rem;
`
const Title = styled.h1`
    font-style: normal;
    font-weight: 800;
    font-size: 23px;
    line-height: 28px;
    color: white;
    text-align: center;
    margin: 0px;
`

const Separator = styled.div`
    width: 100%;
    background-color: white;
    height: 1px;
    margin: 1.8rem 0px 3rem 0px;
`

const H3 = styled.h3`
    font-weight: 800;
    font-size: 21px;
    line-height: 26px;
    color:white;
    margin: 1.7rem 0px;
    cursor: pointer;

    &:hover {
        color: rgba(255, 245, 235, 0.8);
    }
`
const Arrow = styled.div<{hide:boolean}>`
	margin: ${(props) => props.hide ? '7px 20px 0px 0px' : '20px 20px 0px 0px'};
	width: 13px;
	height: 13px;
	box-sizing: border-box;
	transform: ${(props) => props.hide ? 'rotate(-45deg)' : 'rotate(135deg)'};
	content: '';
	border-width: .4vmin .4vmin 0 0;
	border-style: solid;
	display: block;
	transform-origin: 100% 0;
    float: right;
    align-items: center;
`
interface Props {
    hide: boolean;
    setHide: () => void;
}
const Sidebar:React.FC<Props> = ({hide, setHide}) => {
    const [hideEcommerce, setHideEcommerce] = useState(false)
    const [hideSystem, setHideSystem] = useState(false)
    return (
        <Container hide={hide}>
            <Close src="/assets/cerrar.svg" onClick={setHide} />
            <Wrapper>
            <Title>Admin</Title>
            <Separator />
            <H3>Dashboard</H3>  
            <H3 onClick={() => setHideEcommerce(!hideEcommerce)}>Ecommerce <Arrow hide={hideEcommerce}/></H3>
                {hideEcommerce && 
                <div style={{marginLeft: '20px'}}>
                    <Link  href='/admin/products'>
                    <a className='link'>
                    <H3>Productos</H3>
                    </a>
                    </Link>
                    <Link href='/admin/categories'>
                    <a className='link'>
                    <H3>Categorias</H3>
                    </a>
                    </Link>
                    <Link href='/admin/orders'>
                    <a  className='link'>
                    <H3>Pedidos</H3>
                    </a>
                    </Link>
                </div>   
                }
            <H3 onClick={() => setHideSystem(!hideSystem)}>System <Arrow hide={hideSystem}/></H3>
                {hideSystem && <div style={{marginLeft: '20px'}}>
                    <Link href='/admin/users'>
                        <a  className='link'>
                        <H3>Users</H3>
                        </a>
                    </Link>
                </div>}
            </Wrapper>
        </Container>
    )
}

export default Sidebar