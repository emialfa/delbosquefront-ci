import Link  from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { device } from '../../responsive'

const Triangle = styled.div<{hide:boolean}>`
    display: ${(props) => props.hide ? 'flex' : 'none'};
    position: absolute;
    transform: translate(0px, 30px);
    width: 0;
    height: 0;
    border-right: 9px solid transparent;
    border-top: 0px solid transparent;
    border-left: 9px solid transparent;
    border-bottom: 15px solid #99877D;
    justify-content: flex-end;
    transition:all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 2s ease;  
    -o-transition: all 2s ease;  
    -ms-transition: all 2s ease;  

    @media ${device.laptop} {
        display:none;

    }
`
const Wrapper = styled.div<{hide:boolean}>`
    display: ${(props) => props.hide ? 'flex' : 'none'};
    width: ${(props) => props.hide ? '225px' : '0px'};
    height: ${(props) => props.hide ? '340px' : '0px'};
    transform: translate(0px, 41px);
    background: #99877D;
    border-radius: 30px;
    position: absolute;
    z-index: 10;  
    transition:all 2s ease-in;
    -webkit-transition: all 2s ease-in;
    -moz-transition: all 2s ease-in;  
    -o-transition: all 2s ease-in;  
    -ms-transition: all 2s ease-in;   
    
    @media ${device.laptop} {
        display: none;
    }
`
const Ul = styled.ul`
     margin-bottom:0px;
     padding:45px 20px;
     color:#FFF5EB;
`
const Li = styled.li`
    list-style: none;
    text-align: left;
    padding: 20px;
    cursor: pointer;
    text-decoration: none;
    color: inherit;

    &:hover {
        color: rgba(255, 245, 235, 0.8);
    }
`
interface Props {
    hide: boolean;
    setHide: (state:boolean) => void;
    handleLogout: () => void;
}
const MiCuenta:React.FC<Props> = ( {hide, setHide, handleLogout}) => {
    return (
        <>
            <Triangle hide={hide}/>
            <Wrapper hide={hide}>
                <Ul>
                    <Link  href='/user/myfavorites'>
                    <a onClick={() => setHide(false)}>
                    <Li>Mis Favoritos</Li>
                    </a>
                    </Link>
                    <Link  href='/user/myorders'>
                    <a onClick={() => setHide(false)}>
                    <Li>Mis compras</Li>
                    </a>
                    </Link>
                    <Link  href='/user/myconfig'>
                    <a onClick={() => setHide(false)}>
                    <Li>Mis datos</Li>
                    </a>
                    </Link>
                    <Li onClick={() => handleLogout()}>Cerrar sesión</Li>
                    <Li>
                    </Li>
                </Ul>
            </Wrapper>
        </>
    )
}

export default MiCuenta
