import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllUsers } from '../../services/admin'
import { useRouter } from 'next/router'
import Topbar from '../../components/admin/topbar'
import EditUser from '../../components/admin/editUser'
import { IUser } from '../../types/user'
import { useAppSelector } from '../../store/hooks'
import PrivateRoutes from '../../components/privateRoutes'
import Head from 'next/head'

const UsersContainer = styled.div`
    margin: 0px 8%;
    display: flex;
    flex-direction: column;
`

const Title = styled.h1`
    margin-left: 10px;
    font-weight: 800;
    font-size: 23px;
    line-height: 28px;
    color: #000000;
    margin-bottom: 2rem;
`

const Edit = styled.td`
    background-image: url("/assets/editProduct.svg");
    background-repeat: no-repeat;
    background-position: center;
    width: 50px;
`

const Remove = styled.td`
    background-image: url("/assets/removeProduct.svg");
    background-repeat: no-repeat;
    background-position: center;
    width: 50px;
`
const Table = styled.table`
    color: #212529;
    vertical-align: top;
    border-color: #dee2e6;
    background-color: white;
    border: 1px solid white;
    border-collapse: collapse;
    text-indent: initial;
    border-spacing: 2px;
    caption-side: bottom;
    border-collapse: collapse;
    width:100%;
`
const THead = styled.thead`
    border-color: inherit;
    border-style: solid;
    border-width: 0;
`
const TBody = styled.tbody`
    border-top: 2px solid currentColor;
    
`
const Th = styled.th`
    border-bottom-width: 1px;
`
const Tr = styled.tr`
    cursor: pointer;
    padding: 0.5rem;
    border-color: gray;
    border-style: inherit;
    border-width: 0.5px;
    height: 40px;
    &:hover{
        background-color: #99979733
    }
`
const Td = styled.td`
    display: table-cell;
    vertical-align: inherit;
    text-align: center;
`

const UsersListPage:React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const router = useRouter()
    const token = useAppSelector(state => state.userReducer.user)
    useEffect(() => { 
        if(token){
            getAllUsers(token)
                .then((res: IUser[]) => setUsers(res))
        }
    }, [token])

    const handleEditUser = (id:string) => {
        router.push('/admin/users?edit='+id)
    }
    return (
        <PrivateRoutes admin={true}>
            <Head>
                <title>Admin: Usuarios | DelBosqueBordados-Tienda</title>
            </Head>
            <Topbar />
            <UsersContainer>
                <Title>Usuarios registrados</Title>
                <Table>
                    <THead>
                        <tr style={{padding: '0.5rem', borderBottomWidth: '1px', height: '40px'}}>
                        <Th scope="col">Name</Th>
                        <Th scope="col">Email</Th>
                        <Th scope="col">Admin</Th>
                        <Th scope="col"></Th>
                        <Th scope="col"></Th>
                        </tr>
                    </THead>
                    <TBody>
                        {users.map(u => 
                        <Tr key={u._id} onClick={() => handleEditUser(`${u._id}`)}>
                        <Th scope="row">{u.name}</Th>
                        <Td>{u.email}</Td>
                        <Td>{u.isAdmin ? 'Si' : 'No'}</Td>
                        <Edit></Edit>
                        <Remove></Remove>
                        </Tr>
                        )}
                    </TBody>
                </Table>
            </UsersContainer>
            {router.query.edit && <EditUser />}
        </PrivateRoutes>
    )
}

export default UsersListPage