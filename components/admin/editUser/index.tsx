import { useEffect, useState } from 'react'
import { getOneUser } from '../../../services/admin'
import styled from 'styled-components';
import { userDelete } from '../../../services/users';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../../store/hooks';
import { IUser } from '../../../types/user';


const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(196, 196, 196, 0.58);
  top: 0px;
`;

const Wrapper = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: white;
    border-radius: 30px;
    padding: 2rem 2rem .5rem 2rem;
    box-shadow: 0px 6.32558px 15.814px rgba(0, 0, 0, 0.25);
    border-radius: 23.7209px;
    width: 450px;
    min-height: 420px;
    margin-left: -225px;
    margin-top: -210px;
`
const Row = styled.div`
    display:flex;
    flex-direction:row;
`
const NameData = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 17px;
    line-height: 21px;
    color:black;
    margin-right: 1rem;
    margin-bottom: 1rem;
`
const UserData = styled.p`
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 20px;
    color:black;
`

const Save = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  text-align: center;
  background-color: white;
  border-radius: 11.8605px;
  color: black;
  margin-top: 1rem;
  cursor: pointer;
  margin: 1rem 1rem 0px 1rem;
  border: 1px solid black;
`
interface Props {
    setupdate: (state:boolean) => void;
}
const EditUser: React.FC<Props> = ({setupdate}) => {
    const router = useRouter()
    const [user, setUSer] = useState<IUser>()
    const token = useAppSelector(state => state.userReducer.user)
    useEffect(() => {
        getOneUser(`${router.query.edit}`, token)
        .then(res => {setUSer(res)})
        .catch(err => console.log(err))
    }, [router.query])

    const handleDelete = (id:string) => {
        userDelete(id, token)
        .then(res => {
            setupdate(true)
            router.push('/admin/users');
        })
        .catch(err => console.log(err))
    }
    return (
        <>  
            <Background />
            <Wrapper>
                <Row>
                    <NameData>Nombre y Apellido:</NameData> 
                    <UserData>{user?.name}</UserData>
                </Row>
                <Row>
                    <NameData>Email:</NameData> 
                    <UserData>{user?.email}</UserData>
                </Row>
                <Row>
                    <NameData>Teléfono:</NameData> 
                    <UserData>{user?.phone}</UserData>
                </Row>
                <Row>
                    <NameData>Dni/Pasaporte:</NameData> 
                    <UserData>{user?.document}</UserData>
                </Row>
                <Row>
                    <NameData>Localidad:</NameData> 
                    <UserData>{user?.city}</UserData>
                </Row>
                <Row>
                    <NameData>Dirección:</NameData> 
                    <UserData>{user?.street}</UserData>
                </Row>
                <Row>
                    <NameData>Cod. Postal:</NameData> 
                    <UserData>{user?.zip}</UserData>
                </Row>
                <Row>
                    <NameData>Admin:</NameData> 
                    <UserData>{user?.isAdmin ? 'Si' : 'No'}</UserData>
                </Row>
                <Row style={{justifyContent: 'center'}}>
                <Save onClick={() => handleDelete(`${user?._id}`)}><img src="/assets/removeProduct.svg" alt='remove product'></img></Save>
                <Save onClick={() => router.push('/admin/users')}>Volver</Save>
                </Row>
            </Wrapper>
        </>
    )
}

export default EditUser