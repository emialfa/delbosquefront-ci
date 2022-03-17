import React, { useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../sidebar'
import { initLocalCart } from '../../../store/actions/cart'
import { logout } from '../../../store/actions/user'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../store/hooks'

const LogoContainer = styled.div`
    margin:2rem 1rem 5rem 1rem;
    align-items: center;
    display: grid;
    grid-template-columns: 30% 40% 30%;
    height: 120px;
`
const Menu = styled.img`
    margin-right: auto;
    cursor: pointer;

    &:hover{
        opacity: 0.7;
    }

`
const Logo = styled.img`
    height: 83%;
    object-fit: cover;
    object-position: center center;
    margin: auto;
    cursor: pointer;
`
const Logout = styled.img`
    margin-left: auto;
    cursor: pointer;

    &:hover{
        opacity: 0.7;
    }
`
const Container = styled.div`
    width:94%;
    margin: auto;
`

const Topbar:React.FC = () => {
    const dispatch = useDispatch()
    const [hideSidebar, setHideSidebar] = useState(false)
    const { user } = useAppSelector(state => state.userReducer)
    const handleLogout = () => {
        dispatch(logout(user))
        dispatch(initLocalCart())
        window.location.replace(window.location.origin)
    };
    return (
        <Container>
            <Sidebar hide={hideSidebar} setHide={() => setHideSidebar(!hideSidebar)}/>
            <LogoContainer>
                <Menu src="/assets/menu.svg" onClick={() => setHideSidebar(!hideSidebar)} />
                <Logo src="/assets/delbosque-logo.svg"></Logo>
                <Logout src="/assets/adminLogout.svg" onClick={handleLogout}/>
            </LogoContainer>
        </Container>
        )
}

export default Topbar