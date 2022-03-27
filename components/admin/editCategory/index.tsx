import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { initCategories } from '../../../store/actions/categories'
import {initTypes} from '../../../store/actions/types'
import { getOneCategory, loadOneCategory, editOneCategory, deleteOneCategory } from '../../../services/admin'
import { useRouter } from 'next/router';
import { useAppSelector } from '../../../store/hooks';
import { ICategory } from '../../../types/categories';


const Container = styled.div``;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(196, 196, 196, 0.58);
  top: 0px;
`;

const Wrapper = styled.div`
  position: fixed;
  width: 388px;
  height: 450px;
  background: #ffffff;
  box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
  border-radius: 23.7209px;
  top: 50%;
  left: 50%;
  margin-top: -225px;
  margin-left: -194px;
  display: flex;
  flex-direction: column;
  padding: 2rem 2.5rem;
`;

const Title = styled.h1`
    font-style: normal;
    font-weight: 800;
    font-size: 27px;
    line-height: 33px;
    color:black;
    margin-bottom: 1.7rem;
    text-align: center;
`

const OptionWrapper = styled.div`
    display:flex;
    flex-direction: row;
    margin: 15px 0px 15px 0px;
`

const OptionTitle = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 23px;
    line-height: 28px;
    color: black;
    margin-right: 10px;
    margin-bottom: 0px;
`

const Nombre = styled.input`
    font-style: normal;
    font-weight: 300;
    font-size: 23px;
    line-height: 27px;
    color:black;
    appearance: none;
    border: none;
    min-width: 12rem;
`

const Color = styled.input``

const Icono = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    z-index: 3;
`

const Upload = styled.input`
  opacity: 0;
  position: absolute;
  width: 30px;
  z-index: 2;
  cursor: pointer;
  font-size: 0;
  margin-right: 2rem;
`
const UploadLabel = styled.label`
  position: absolute;
  top: 0px;
  background-image: url("/assets/uoloadIcon.svg");
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-right: 2rem;
`

const Category = styled.div<{color:string}>`
    background-color: white;
    border-radius: 6px;
    font-style: normal;
    font-weight: 800;
    font-size: 13.9px;
    line-height: 17px;
    color: #000000;
    padding: 7px 23px;
    border-bottom: ${props => props.color ? `6px solid ${props.color}` : '6px solid black'};
    margin: 0px 10px;
    white-space: nowrap;
    cursor: pointer;
`
const CategoryIcon = styled(Category)<{color:string, icon:number}>`
        background-color: ${props => props.color ? `${props.color}` : 'black'};
        background-image: ${props => props.icon ? `url(${props.icon})` : 'none'};
        background-position: center;
        background-repeat: no-repeat;
        background-size: 20px;
        background-position: 50% 80%;
        color: transparent;   
`

const Save = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 45px;
  text-align: center;
  background: #99877d;
  border-radius: 11.8605px;
  color: white;
  margin-top: 1rem;
  cursor: pointer;
  margin: 1rem auto 1rem auto;
  width: 60%;
`
const CloseButton = styled.div`
    font-style: normal;
    font-weight: 200;
    font-size: 50px;
    line-height: 17px;
    color: black;
    position: fixed;
    z-index: 6;
    transform: rotate(45deg);
    right: 23px;
    top: 23px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`

const c = {
    _id: '1',
    name: "",
    color: "#ffffff",
    icon: "",
}

const EditCategory:React.FC = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {user} = useAppSelector(state => state.userReducer)
    const [category, setCategory] = useState<ICategory>(c)
    const [title, setTitle] = useState('')
    const [icon, setIcon] = useState<any[]>([])
    const [nameState, setNameState] = useState('')
    const [colorState, setColorState] = useState('')
    const name = useRef<HTMLInputElement>(null)
    const color = useRef<HTMLInputElement>(null)
    const iconFile = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const getCategory = async () => {
        const url= router.query.type ? `types/${router.query.type}` : `categories/${router.query.category}`
        getOneCategory(url)
            .then((res:any) => {
            setTitle(router.query.type ? 'Tipo' : 'Línea')
            setCategory(res);
            if (color.current) color.current.value= res.color;
            setNameState(res.name)
            setColorState(res.color)
        })
        }
        const newCategory = (n:string) => {
            setTitle(n)
            if (color.current) color.current.value= `${category.color}`;
        }
        router.query.new ? newCategory(`${router.query.new}`) : getCategory()
    }, 
    [router.query])

    const handleFile = ({target}:React.ChangeEvent<HTMLInputElement>) => {
        if(target.files) {setIcon([URL.createObjectURL(target.files[0]), target.files[0]])};
    }

    const handleDelete = async () => {
        const cat = title === 'Tipo' ? 'types' : 'categories' 
        if(category._id !== '1'){
            const path = cat+'/'+category._id
            deleteOneCategory(path, user)
                .then((res:any) => {cat === 'categories' ? dispatch(initCategories()) : dispatch(initTypes()); router.push('/admin/categories')})
                .catch((err:any) => console.log(err))
        }
    }

    const handleSubmit = async () => {
        const form = new FormData()
        form.append('color', `${color.current?.value}`);
        form.append('icon', `${category.icon}`);
        (`${name.current?.value}`).length === 0 ? form.append('name', category.name) : form.append('name', `${name.current?.value}`);
        icon.length > 0 && form.append('image', icon[1])
        const cat = title === 'Tipo' ? 'types' : 'categories' 
        if(category._id === '1'){
            const path = cat+'/'
            loadOneCategory(path, form, user)                
            .then((res:any) => {cat === 'categories' ? dispatch(initCategories()) : dispatch(initTypes()); router.push('/admin/categories')})
            .catch((err:any) => console.log(err))

        }
        else {
            const path = cat+'/'+router.query[`${title === 'Tipo' ? 'type' : 'category'}`]
            editOneCategory(path, form, user)           
            .then((res:any) =>  {cat === 'categories' ? dispatch(initCategories()) : dispatch(initTypes()); router.push('/admin/categories')})
            .catch((err:any) => console.log(err))

    }
        }
    return (
        <>
        <Container>
            <Background onClick={() => router.push('/admin/categories')}/>
            <CloseButton style={{position: 'absolute', right: '15px', top: '15px', fontSize: '40px'}} onClick={() => router.push('/admin/categories')}>+</CloseButton>
            <Wrapper>
                <Title>{title}</Title>
                <OptionWrapper>
                <OptionTitle>Nombre:</OptionTitle>
                <Nombre type='text' defaultValue={category.name} ref={name} onChange={(e) => setNameState(e.target.value)}></Nombre>
                </OptionWrapper>
                <OptionWrapper>
                <OptionTitle>Color:</OptionTitle>
                <Color type='color' defaultValue={category.color} ref={color} onChange={(e) => setColorState(e.target.value)}></Color>
                </OptionWrapper>
                <OptionWrapper>
                <OptionTitle>Icono:</OptionTitle>
                <Icono>
                    <Upload type='file' ref={iconFile} onChange={handleFile}/>
                    <UploadLabel />
                </Icono>
                </OptionWrapper>
                <OptionWrapper style={{margin: '30px -1rem 30px -1rem', justifyContent: 'center'}}>
                    <Category color={colorState}>{nameState}</Category>
                    <CategoryIcon icon={icon.length > 0 || category.icon ? 1 : 0} color={colorState}>{category.name}</CategoryIcon>
                </OptionWrapper>
                <OptionWrapper style={{margin: '0px', justifyContent: 'space-around'}}>
                <Save onClick={handleSubmit}>Guardar</Save>
                <Save onClick={handleDelete} style={{backgroundColor: 'white', border: '1px solid black', padding: '10px 15px', width: '18%'}}><img src="/assets/removeProduct.svg" alt='Delete product'></img></Save>
                </OptionWrapper>
            </Wrapper>
        </Container>
        </>
    )
}

export default EditCategory