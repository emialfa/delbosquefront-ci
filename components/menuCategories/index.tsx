import Link  from 'next/link'
import styled from 'styled-components'
import { device } from '../../responsive'
import { ICategory } from '../../types/categories'
import { IType } from '../../types/types'

const Triangle = styled.div<{hide: boolean}>`
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
const Wrapper = styled.div<{hide: boolean}>`
    display: ${(props) => props.hide ? 'flex' : 'none'};
    width: ${(props) => props.hide ? '319px' : '0px'};
    background: #99877D;
    border-radius: 30px;
    position: absolute;
    transform: translate(0px, 44px);
    z-index: 1000;  
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
     margin-left: 0.9rem;
`
const Li = styled.li`
    list-style: none;
    text-align: left;
    padding: 20px;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display:flex;
    justify-content: space-between;

    &:hover{
        color: rgba(255, 245, 235, 0.8);
    }

`

interface Props {
    hide: boolean;
    setHide: (state:boolean) => void;
    categories: {
        lines: ICategory[],
        types: IType[]
    }
}
const MenuCategories: React.FC<Props> = ({hide, setHide, categories}) => {

    return (
        <>
        <Triangle hide={hide}/>
        <Wrapper hide={hide}>
            <Ul>
                {Array.isArray(categories.lines) && categories.lines.map((c) => 
                (<Link key={'category'+c.name} href={`/category/${c.name}`} >
                    <a onClick={()=> setHide(false)}>
                    <Li>{c.name}</Li>
                    </a>
                </Link>))} 
            </Ul>
        </Wrapper>
    </>
    )
}

export default MenuCategories
