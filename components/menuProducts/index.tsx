import { useState } from 'react'
import Link  from 'next/link'
import styled from 'styled-components'
import { device } from '../../responsive'
import { useRouter } from 'next/router'
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

    &:hover {
        color: rgba(255, 245, 235, 0.8);
    }
`

const SubLi = styled(Li)<{hide:boolean}>`
    display: ${(props)=> props.hide ? 'flex' : 'none'};
`
const Arrow = styled.div<{hide: boolean}>`
	margin: ${(props) => props.hide ? '5px -42px 0px 0px' : '15px -101px -15px 0px'};
	width: 10px;
	height: 10px;
	box-sizing: border-box;
	transform: ${(props) => props.hide ? 'rotate(-45deg)' : 'rotate(135deg)'};
	content: '';
	border-width: .4vmin .4vmin 0 0;
	border-style: solid;
	display: block;
	transform-origin: 100% 0;
`

interface Props {
    hide: boolean;
    setHide: (state:boolean) => void;
    categories: {
        lines: ICategory[],
        types: IType[]
    }
}
const MenuProducts: React.FC<Props> = ({hide, setHide, categories}) => {
    const [hideLi, setHideLi] = useState('')
    const router = useRouter()

    const handleSelectType = (t: IType) => {
        setHideLi(hideLi === t.name ? '' : t.name);
        if (t.categories.length === 0){
            router.push('/products/'+t.name);
            setHide(false)
        }
    }
    return (
        <>
        <Triangle key='menuProductsTriangle' hide={hide}/>
        <Wrapper key='menuProductsWrapper' hide={hide}>
            <Ul>
                {Array.isArray(categories.types) && categories.types.map((t) => 
              (<div key={'type'+t.name+'menumobile'}><Li onClick={()=> handleSelectType(t)}>{t.name} {t.categories.length > 0 && <Arrow hide={hideLi === t.name}/>}</Li> 
                    <Ul style={{marginLeft: '30px', padding: '0px'}}>
                        {t.categories.map((c, indice )=> 
                        (<Link key={`menuProductsCategories${indice}`} href={`/products/${t.name}&category=${c}`}> 
                        <a onClick={() => setHide(false)}>
                        <SubLi key={`menuProductsCategories${c}`} hide={hideLi === t.name}>{c}</SubLi>
                        </a>
                        </Link>))}
                        {t.categories.length > 1 && <Link key={`menuProductsTodos`} href={`/products/${t.name}`}> 
                        <a onClick={() => setHide(false)}>
                        <SubLi key={`menuProductsTodos${t.name}`} hide={hideLi === t.name}>Todos</SubLi>
                        </a>
                        </Link>}
                    </Ul></div>))}
            </Ul>
        </Wrapper>
    </>
    )
}

export default MenuProducts
