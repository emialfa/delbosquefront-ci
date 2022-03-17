import React, { ChangeEvent, FocusEvent, useState } from 'react'
import styled from 'styled-components'
import SearchProducts from '../searchProducts'
import { useAppSelector } from '../../store/hooks'
import { IProduct } from '../../types/product'

const Container = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
`

const SearchComponent = styled.input`
    display: flex;
    background: #FFFFFF;
    border-radius: 20px;
    margin:auto;
    align-items: center;
    justify-content: center;
    width:353px;
    height:40px;
    font-family: 'Urbanist', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 17px;
    background-image: url('/assets/search.svg');
    background-repeat: no-repeat;
    text-indent: 20px;
    text-align: center;
    border: 0;
    background-position: 42% 50%;
    outline: none;
    z-index: 1;
    &:focus{
        background-image: none;
        text-indent: 0px;
        &::placeholder{
           opacity:0;
        }
    }
`

const Ul = styled.ul<{active: boolean}>`
    display: ${(props) => props.active ? 'block' : 'none'};
    position: absolute;
    flex-direction: column;
    transform: translate(0px, 41px);
    border: none;
    width: 353px;
    padding: 0px;
    z-index: 1;
    background-color: white;
`
interface Props {
    autocomplete?:string;
    admin?:boolean;
}
const Search: React.FC<Props> = ({autocomplete, admin}) => {
    const [search, setSearch] = useState<IProduct[]>([]);
    const products = useAppSelector(state => state.productsReducer);

    const handleSearch = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
         if(value.length > 0){
            const filterProducts:IProduct[] = products.filter((p:IProduct) => p.name.toLowerCase().indexOf(value.toLowerCase())>=0 ||  p.category.toLowerCase().indexOf(value.toLowerCase())>=0 );
            setSearch(filterProducts);
        }
        else{
            setSearch([])
        }
    }

    const handleBlur = ({target: {value}}: FocusEvent<HTMLInputElement>) => {
        setTimeout(()=> {
            value = '';
            setSearch([])
        }, 150);   
    }

    return (
        <Container>
            <form autoComplete='off'>
            <SearchComponent name="search" autoComplete="off" placeholder="Buscar" onChange={handleSearch} onBlur={handleBlur}/></form>
            <Ul className="dropdown-menu" id="dropdown" aria-labelledby="dropdownMenuButton1" active={search.length > 0 ? true : false}>
                {search.map((p)=> (
                    <SearchProducts product={p}  key={`productS${p.id}`} admin={admin}/>
                ))}
            </Ul>
            
        </Container>
    )
}

export default Search
