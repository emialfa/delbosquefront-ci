import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { getProducts, loadOneProduct, editOneProduct} from '../../../services/admin'
import { useRouter } from "next/router";
import { useAppSelector } from "../../../store/hooks";
import { IProduct } from "../../../types/product";

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
  width: 346px;
  min-height: 544px;
  background: #ffffff;
  box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
  border-radius: 23.7209px;
  top: 50%;
  left: 50%;
  margin-top: -272px;
  margin-left: -173px;
  display: flex;
  flex-direction: column;
`;

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.6rem 3rem 1rem 3rem;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
`;
const TitlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.input`
  font-style: normal;
  font-weight: 800;
  font-size: 20.609px;
  line-height: 25px;
  color: black;
  margin-bottom: 0.2rem;
  border: none;
  width: 13rem;

  &::placeholder{
    color: black;
  }
`;
const Stock = styled.input`
  font-style: normal;
  font-weight: 300;
  font-size: 16.3093px;
  line-height: 107.3%;
  color: #868686;
  border: none;
  max-width: 5rem;
  margin-left: 10px;
`;

const Linea = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16.3093px;
  line-height: 107.3%;
  color: #868686;
  border: none;
  max-width: 13rem;
`;

const FavButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 3px;
  cursor: pointer;
  margin-top: -0.7rem;
`;
const FavImg = styled.img`
  object-fit: cover;
  object-position: center center;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 2s ease;
  -o-transition: all 2s ease;
  -ms-transition: all 2s ease;
`;

const Desc = styled.textarea`
  font-style: normal;
  font-weight: 300;
  font-size: 14.2326px;
  line-height: 107.3%;
  color: #868686;
  margin-top: 1.6rem;
  margin-bottom: 1.3rem;
  border: none;
  width: 13rem;
  overflow-y: hidden;
  resize: none;
`;
const PriceMask = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 20.609px;
  line-height: 25px;
  color: black;
  display:flex;
`
const Price = styled.input`
  font-style: normal;
  font-weight: 800;
  font-size: 20.609px;
  line-height: 25px;
  color: black;
  border: none;
  max-width: 8rem;

  &::placeholder{
    color:black;
  }
`;
const AddToCart = styled.div`
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
`;
const Close = styled.img`
  top: 50%;
  left: 50%;
  margin-top: -255px;
  margin-left: 137px;
  position: fixed;
  cursor: pointer;

  &:hover{
    opacity: 0.7;
  }
`;

const Slider = styled.div`
    position: relative;
`

const GuideButtonsWrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 0;
    margin-right: 15%;
    margin-bottom: 1rem;
    margin-left: 15%;
    list-style: none;
`

const GuideButton = styled.div<{opacity:string}>`
    border-top: 0px solid transparent;
    border-bottom: 0px solid transparent;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    opacity: ${(props) => props.opacity};
    box-sizing: content-box;
    flex: 0 1 auto;
    padding: 0;
    margin-right: 3px;
    margin-left: 3px;
    text-indent: -999px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
`

const CarouselImg = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 23.7209px 23.7209px 0px 0px;
`

const ImgContainer = styled.div<{display:string}>`
    height: 279px;
    position: relative;
    display: ${(props) => props.display};
    float: left;
    width: 100%;
    margin-right: -100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: transform .6s ease-in-out;
`
const Image = styled.img`
    width: 100%!important;
`
const ButtonLeftContainer = styled.div`
    cursor: pointer;
    left: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    padding: 0;
    color: #fff;
    text-align: center;
    background: 0 0;
    border: 0;
    opacity: .5;
    transition: opacity .15s ease;

    &:hover{
        opacity: 1;
    }
`
const ButtonLeft = styled.span`
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e");
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
`
const ButtonRightContainer = styled.div`
    cursor: pointer;
    right: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    padding: 0;
    color: #fff;
    text-align: center;
    background: 0 0;
    border: 0;
    opacity: .5;
    transition: opacity .15s ease;

    &:hover{
        opacity: 1;
    }
`
const ButtonRight = styled.span`
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
`
const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, .1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #99877D;
  position:fixed;
  top:50%;
  left:50%;
  margin-top:-18px;
  margin-left:-18px;

  animation: spin 1s ease infinite;
`
const UploadWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 1rem;
    z-index:3;
    display:flex;
    justify-content: center;
    background-color: black;
    height: 32px;
    width: 84px;
    transform: translate(-50%, 0px);
    border-radius: 12px;
    opacity: 0.7;
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
  background-image: url('/assets/upload.svg');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-right: 2rem;
  z-index: 3;
  &:hover{
    opacity: 0.7;
  }
`
const RemoveWrapper = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    display: flex;
    margin-left: 2rem;
    justify-content: center;
    align-items: center;
    top: 0px;
`

const Remove = styled.img`
  cursor: pointer;
  object-fit: cover;
  object-position: center center;
  
  &:hover{
    opacity: 0.7;
  }
`
const Select = styled.select`
  border: 0px solid #ced4da;
  border-radius: 6px;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right .75rem center;
  background-size: 0px 0px;
  appearance: none;
  font-style: normal;
  font-weight: 300;
  font-size: 16.3093px;
  line-height: 107.3%;
  color: #868686;
`

const Option = styled.option`
  padding:1px 3px;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 107.3%;
  color: #868686;
`

const SelectType = styled(Select)`
    font-weight: 300;
    font-size: 15px;
    line-height: 21px;
    color: rgb(134, 134, 134);
    background-position: right 7rem center;
    margin-top: 10px;
`
const LoaderSpin = styled.div`
  border: 4px solid rgba(0, 0, 0, .1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #99877D;
  margin: auto;
  animation: spin 1s ease infinite;
  `
const noImage = 'https://res.cloudinary.com/delbosque-tienda/image/upload/v1634497960/noImage_w4m5hg.png'

const newProduct = {
  id: '1',
  name: 'Prendedor',
  category: 'Línea Otoño',
  description: 'Prendedor de forma circular. Medidas 25mm x 25mm',
  type: 'Prendedores',
  price: 300,
  countInStock: 50,
  image: noImage,
  quantity: 50,
  images: [],
  _id: ''
}


const EditProduct:React.FC = () => {
  const router = useRouter()
  const [product, setProduct] = useState<IProduct>();
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedImages,setSelectedImages] = useState<string[]>([]);
  const [images, setImages] = useState<any>([])
  const [urls, setUrls] = useState<string[]>([])
  const [hideLoader, setHideLoader] = useState(false)
  const inputFile = useRef<HTMLInputElement>(null)
  const name = useRef<HTMLInputElement>(null)
  const linea =  useRef<HTMLSelectElement>(null)
  const description =  useRef<HTMLTextAreaElement>(null)
  const price =  useRef<HTMLInputElement>(null)
  const type =  useRef<HTMLSelectElement>(null)
  const countInStock =  useRef<HTMLInputElement>(null)
  const categoriesList = useAppSelector(state => state.categoriesReducer)
  const typesList = useAppSelector(state => state.typesReducer)
  const {user} = useAppSelector(state => state.userReducer)

  useEffect(() => {
   
    const getProduct = async () => {
        if(router.query.singleproduct){
        getProducts(`${router.query.singleproduct}`)
          .then((res:IProduct) => {
          setProduct(res);
          setSelectedImages([res.image, ...res.images]);
          setUrls([res.image, ...res.images]);
        })
       };
    }
    const getNewProduct = () => {
      setProduct(newProduct);
      setSelectedImages([noImage])
      setUrls([noImage])  
    }
    !router.query.new ? getProduct() : getNewProduct();
  }, [router.query]);

  const handleClick = (direction:string) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : selectedImages.length-1);
    } else {
      setSlideIndex(slideIndex <  selectedImages.length-1 ? slideIndex + 1 : 0);
    }
  };

  const handleClose = () => {
    router.back()
  }

  const handleSubmit = async () => {
    const form = new FormData()
    form.append('urls', `${urls}`)
    for(let i of images){
        form.append('image', i)
    }
    (`${name.current?.value}`).length > 0 ? form.append('name', `${name.current?.value}`) : form.append('name', `${product?.name}`);
    form.append('category', `${linea.current?.value}`);
    description.current?.value ?  form.append('description',(`${description.current?.value}`).replace(/\n/g,"<br>")) : form.append('description', 'Prendedor de forma circular.<br>Medidas 25mm x 25mm');
    Number(price.current?.value) > 0 ? form.append('price', `${price.current?.value}`) : form.append('price', `${product?.price}`);
    form.append('type', `${type.current?.value}`);
    countInStock.current?.value ? form.append('countInStock',countInStock.current.value) : form.append('countInStock', `${product?.countInStock}`);
    if(product?.id === '1'){
      setHideLoader(true)
      loadOneProduct(form, user)
     .then((res:any)=> {console.log(res); router.push('/admin/products')})
     .catch((err:any) => {console.log(err); router.push('/admin/products')})
    }
    else{
      setHideLoader(true)
      editOneProduct(`${product?.id}` , form , user)
     .then((res:any)=> {console.log(res); router.push('/admin/products')})
    .catch((err:any) => {console.log(err); router.push('/admin/products')})
    }
  }

  const uploadImage = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const files = target.files ? [...target.files] : [];
    if (selectedImages.indexOf(noImage) >= 0) {
        const arr= Array.from(files).map(elem => URL.createObjectURL(elem));
        setSelectedImages([...arr]); 
        setImages([...files])
        console.log(files)
    }
    else{
      const arr= Array.from(files).map(elem => URL.createObjectURL(elem));
      setSelectedImages([...selectedImages,...arr]); 
      setImages([...images, ...files])
      console.log(files)
    }
  }

  const removeImage = () => {
    if(selectedImages.length > 1){
      setImages(images.filter((elem:string, indice:number) => indice !== slideIndex));
      setSelectedImages(selectedImages.filter((elem, indice) => indice !== slideIndex )); 
      if(slideIndex > 0){
        handleClick("left"); 
      }
      else {
        setSlideIndex(0); 
      }
      setUrls(urls.filter((elem, indice) => indice !== slideIndex ))
    }
  }

  return (
    <>
    <Container>
      <Background onClick={handleClose}/>
      <Wrapper key={`singleproduct${product?.id}`}>
        <Slider>
            <UploadWrapper>
                <Upload type="file" onChange={uploadImage} ref={inputFile} multiple/>
                <UploadLabel onClick={() => inputFile.current?.click()}></UploadLabel>
                <RemoveWrapper onClick={removeImage}>
                  <Remove src="/assets/remove.svg"></Remove>
                </RemoveWrapper>
            </UploadWrapper>
            <GuideButtonsWrapper>
            {Array.isArray(selectedImages) && selectedImages.map((p, indice) => (
                <GuideButton key={'guidebutton'+indice} opacity={slideIndex === indice ? '1' : '.5'}></GuideButton>
                ))}
            </GuideButtonsWrapper>
            <CarouselImg >
                {Array.isArray(selectedImages) && selectedImages.map((p, indice) => (
                     <ImgContainer key={'img'+indice} display={slideIndex === indice ? 'block': 'none'}>
                     <Image src={p} alt={`${product?.name} image n° ${indice}`}></Image>
                 </ImgContainer>
                ))}
            </CarouselImg>
            <ButtonLeftContainer>
                <ButtonLeft onClick={() => handleClick("left")}></ButtonLeft>
            </ButtonLeftContainer>
            <ButtonRightContainer>
                <ButtonRight onClick={() => handleClick("right")}></ButtonRight>
            </ButtonRightContainer>
        </Slider>
        <DescWrapper>
          <Top>
            <TitlesWrapper>
              <Title type='text' defaultValue={product?.name} ref={name}></Title>
              <Select ref={linea}>
                {categoriesList.map((c:any) => 
                product?.category === c.name ? <Option value={c.name} selected>{'"'+c.name+'"'}</Option> :
                <Option value={c.name}>{'"'+c.name+'"'}</Option>)}
              </Select>
            </TitlesWrapper>
            <FavButton>
              <FavImg
                src="/assets/fav-btn.svg"
                style={{ display: "block" }}
              ></FavImg>
            </FavButton>
          </Top>
          <Desc defaultValue={product?.description?.replace('<br>', '\n')} ref={description} wrap='soft'></Desc>
          <PriceMask>$<Price type='number' defaultValue={product?.price} ref={price}></Price></PriceMask>
          <SelectType ref={type}>
                {typesList.map((t:any) => 
                 product?.type === t.name ? <Option value={t.name} selected>{t.name}</Option> :
                <Option value={t.name}>{t.name}</Option>)}
          </SelectType>
          <div style={{display:'flex', color: '#868686', maxWidth: '5rem', fontSize: '15px', fontWeight: '300'}}>Stock: <Stock style={{ marginLeft: '5px', fontSize: '14px'}} type='number' defaultValue={product?.countInStock || '50'} ref={countInStock}></Stock> </div>
          {hideLoader ? <LoaderSpin /> : <AddToCart onClick={handleSubmit}>Guardar</AddToCart>}
        </DescWrapper>
      </Wrapper>
      <Close src="/assets/x.png" onClick={handleClose}></Close>
    </Container>
    </>
  );
};

export default EditProduct;