import { IOrderWithItemsList } from '../../../types/order'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const Wrapper = styled.div`
    padding: .8rem 2rem;
    margin-right: 0;
    margin-left: 0;
    border-width: 1px;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-radius: 30px; 
    overflow-x: auto;
    width: 100%;
    background-color: white;
    margin-bottom: 1rem;
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
interface Props {
    orders: IOrderWithItemsList[]
}

const OrdersTable: React.FC<Props> = ({orders}) => {
    const router = useRouter()
    const handleViewOrder = (id:string) => {
        router.push('/admin/orders?order='+id)
    }
  return (
    <Wrapper>
        <Table>
            <THead>
                <tr style={{padding: '0.5rem', borderBottomWidth: '1px', height: '40px'}}>
                <Th scope="col">Name</Th>
                <Th scope="col">Email</Th>
                <Th scope="col">Total</Th>
                <Th scope="col">Estado de la compra</Th>
                <Th scope="col">Estado del pago </Th>
                <Th scope="col"></Th>
                </tr>
            </THead>
            <TBody>
                {orders.map((o:any) => 
                <Tr key={o._id} onClick={() => handleViewOrder(o._id)}>
                <Th scope="row">{o.name}</Th>
                <Td>{o.email}</Td>
                <Td>{o.orderItems ? '$'+(JSON.parse(o.orderItems)).total : ''}</Td>
                <Td>{o.status}</Td>
                <Td>{o.paymentStatus == 'No iniciado' ? o.paymentMPStatus : o.paymentStatus}</Td>
                <Edit></Edit>
                </Tr>
                )}
            </TBody>
        </Table>
    </Wrapper>      
  )
}

export default OrdersTable;