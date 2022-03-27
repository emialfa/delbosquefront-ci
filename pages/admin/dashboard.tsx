import styled from "styled-components"
import Topbar from "../../components/admin/topbar"
import PrivateRoutes from "../../components/privateRoutes"
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from "recharts";
import { useAppSelector } from "../../store/hooks";
import { getOrdersCount, getOrdersWeek, getRevenues, getUsersCount, getUsersWeek, getSixMonths, getOrdersday } from "../../services/admin";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IOrderWithItemsList } from "../../types/order";
import { getAdminOrders } from "../../services/orders";
import OrdersTable from "../../components/admin/ordersTable";
import Head from "next/head";

const Container = styled.div`
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
`
const Wrapper = styled.div`
    display: flex;
    margin: 2rem 0px;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: white;
    border-radius: 30px;
    width: 100%;
    min-height: 10rem;
    padding: 1.2rem 2rem 1.2rem 2rem;

    @media (max-width: 565px){
        padding: 1.2rem 0rem 1.2rem 0rem;
    }
`
const WidgetContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Widget = styled.div`
    display: flex;
    width: 191px;
    height: 109px;
    background-color: white;
    box-shadow: 0px 3.91413px 9.78532px rgba(0, 0, 0, 0.15);
    border-radius: 19.5706px;
    margin: 10px;
    flex: 1;
    padding: 1rem;
    flex-direction: column;
    justify-content: space-between;
`
const Top = styled.div`
    display:flex;
    justify-content: space-between;
`
const WidgetTitle = styled.div`
    font-weight: 800;
    font-size: 17.6136px;
    line-height: 22px;
    color: black;
`
const Percent = styled.div<{hide: number}>`
    font-weight: 800;
    font-size: 13.6994px;
    line-height: 17px;
    color: ${props => props.hide >= 0 ? '#4CAF50' : '#F25F4B'};
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const PercentIconContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    padding-right: 3px;
`
const PercentIcon = styled.div<{hide: number}>`
    width: 6.99px;
    height: 6.99px;
    content: '';
	border-width: ${(props) => props.hide >= 0 ? '.4vmin .4vmin 0 0' : ' 0 0 .4vmin .4vmin'};
    border-style: solid;
	display: flex;
    transform: rotate(-45deg);
`
const Center = styled.div`
    font-weight: 800;
    font-size: 23.4848px;
    line-height: 29px;
    color: black;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`
const Detail = styled.div`
    font-weight: 300;
    font-size: 11.7424px;
    line-height: 14px;
    text-decoration-line: underline;
    color: #545454;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`
const Icon = styled.img`

`
const GraphicsContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`
const TotalRevenues = styled.div`
    flex: 4;
    box-shadow: 0px 7.42081px 14.8416px rgba(0, 0, 0, 0.15);
    border-radius: 14.8416px;
    padding: 1rem;
    margin: 1rem 10px;
    height: 359px;
`
const TotalRevenuesBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const CircularProgressBarContainer = styled.div`
    width: 100px;
    height: 100px;
    margin: 2rem 2rem 1rem 2rem;
`
const TotalRevenuesSubtitle = styled.div`
    font-weight: 300;
    font-size: 15px;
    line-height: 17px;
    color: #545454;
    margin-bottom: 0.4rem;
`
const TotalRevenuesAmount = styled.div`
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
`
const TotalRevenuesDesc = styled.div`
    font-weight: 300;
    font-size: 11.90498px;
    line-height: 10px;
    text-align: center;
    color: #545454;
    margin: 1.3rem 0px 1rem 0px;
`
const Summary = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`
const Item = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 40px;
`
const ItemTitle = styled.h3`
    font-weight: 300;
    font-size: 14.2089px;
    line-height: 12px;
    color: #545454;
    text-align: center;
`
const ItemBottom = styled.div<{hide:number}>`
    display: flex;
    justify-content: center;
    color: ${props => props.hide >= 0 ? '#4CAF50' : '#F25F4B'};
    font-weight: 300;
    font-size: 14.557px;
    line-height: 12px;
`
const ItemAmount = styled.div`
    font-weight: 300;
    font-size: 14.557px;
    line-height: 12px;
    color: #4CAF50;
    display: flex;
`

const LastMonthsRevenues = styled.div`
    flex: 7;
    box-shadow: 0px 7.42081px 14.8416px rgba(0, 0, 0, 0.15);
    border-radius: 14.8416px;
    padding: 1rem;
    margin: 1rem 10px;
    height: 359px;
`
const OrdersContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 7.42081px 14.8416px rgba(0, 0, 0, 0.15);
    border-radius: 14.8416px;
    padding: 1rem;
    margin: 1rem 10px;
`
const data = [
    { month: "", total: 0 },
    { month: "", total: 0 },
    { month: "", total: 0 },
    { month: "", total: 0 },
    { month: "", total: 0 },
    { month: "", total: 0 },
  ];

const Dashboard = () => {
  const router = useRouter()
  const { user } = useAppSelector(state => state.userReducer)
  const [usersCount, setUsersCount] = useState()
  const [usersWeekPercent, setUsersWeekPercent] = useState()
  const [ordersCount, setOrdersCount] = useState()
  const [ordersWeekPercent, setOrdersWeekPercent] = useState()
  const [ordersDay, setOrdersDay] = useState({ordersDayTotal: 0, percent: 5})
  const [revenues, setRevenues] = useState()
  const [sixMonths, setSixMonths] = useState(data)
  const [lastWeek, setLastWeek] = useState(0)
  const [lastMonth, setLastMonth] = useState(0)
  const [lastThreeMonths, setLastThreeMonths] = useState(0)
  const [orders, setOrders] = useState<IOrderWithItemsList[]>([])
  useEffect(() => {
      if (user) {
          getUsersCount(user).then((r:any) => setUsersCount(r.usersCount))
          getUsersWeek(user).then((r:any) => setUsersWeekPercent(r.percent))
          getOrdersCount(user).then((r:any) => setOrdersCount(r.orderCount))
          getOrdersWeek(user).then((r:any) => {setOrdersWeekPercent(r.percent); setLastWeek(r.lastWeek)})
          getRevenues(user).then((r:any) => setRevenues(r.revenues))
          getSixMonths(user).then((r:any) => {setSixMonths(r.ordersSixMonths); setLastMonth(r.lastMonth); setLastThreeMonths(r.lastThreeMonths)})
          getOrdersday(user).then((r:any) => setOrdersDay(r))
          getAdminOrders(user).then((r:IOrderWithItemsList[]) => setOrders(r))        
      }
  },[user])

    

  return (
    <PrivateRoutes admin={true}>
        <Head>
            <title>Admin: Dashboard | DelBosqueBordados-Tienda</title>
        </Head>
        <Topbar />
        <Container>
            <Title>Dashboard</Title>
            <Wrapper>
                <WidgetContainer>
                    <Widget>
                        <Top>
                            <WidgetTitle>Usuarios</WidgetTitle>
                            <Percent hide={Number(usersWeekPercent)}><PercentIconContainer><PercentIcon hide={Number(usersWeekPercent)} /></PercentIconContainer>{Number(usersWeekPercent)}%</Percent>
                        </Top>
                        <Center>{Number(usersCount)}</Center>
                        <Bottom>
                            <Detail onClick={() => router.push('/admin/users')}>Ver todos</Detail>
                            <Icon src='/assets/usersIcon.svg'/>
                        </Bottom>
                    </Widget>
                    <Widget>
                        <Top>
                            <WidgetTitle>Pedidos</WidgetTitle>
                            <Percent hide={Number(ordersWeekPercent)}><PercentIconContainer><PercentIcon hide={Number(ordersWeekPercent)} /></PercentIconContainer>{Number(ordersWeekPercent)}%</Percent>
                        </Top>
                        <Center>{Number(ordersCount)}</Center>
                        <Bottom>
                            <Detail onClick={() => router.push('/admin/orders')}>Ver todos</Detail>
                            <Icon src='/assets/ordersIcon.svg'/>
                        </Bottom>
                    </Widget>
                    <Widget>
                        <Top>
                            <WidgetTitle>Ganancias</WidgetTitle>
                            <Percent hide={Number(ordersWeekPercent)}><PercentIconContainer><PercentIcon hide={Number(ordersWeekPercent)} /></PercentIconContainer>{Number(ordersWeekPercent)}%</Percent>
                        </Top>
                        <Center>${revenues}</Center>
                        <Bottom>
                            <Detail onClick={() => router.push('/admin/orders')}>Ver detalle</Detail>
                            <Icon src='/assets/revenueIcon.svg' />
                        </Bottom>
                    </Widget>
                </WidgetContainer>
                <GraphicsContainer>
                    <TotalRevenues>
                        <WidgetTitle>Ingresos totales</WidgetTitle>
                        <TotalRevenuesBody>
                            <CircularProgressBarContainer>
                                <CircularProgressbar value={Number(ordersDay.percent)} text={ordersDay.percent+"%"} strokeWidth={5}/>
                            </CircularProgressBarContainer>
                        <TotalRevenuesSubtitle>Total de ventas del día</TotalRevenuesSubtitle>
                        <TotalRevenuesAmount>${ordersDay.ordersDayTotal}</TotalRevenuesAmount>
                        <TotalRevenuesDesc>Transacciones procesadas anteriormente. Quizas no figuren los ultimos pagos realizados.</TotalRevenuesDesc>
                        <Summary>
                            <Item>
                                <ItemTitle>Ultima semana</ItemTitle>
                                <ItemBottom hide={lastWeek}>
                                    <PercentIconContainer>
                                        <PercentIcon hide={lastWeek} />
                                    </PercentIconContainer>{lastWeek >= 0 ? `$${lastWeek}` : `-$${lastWeek*-1}`}
                                </ItemBottom>
                            </Item>
                            <Item>
                                <ItemTitle>Ultimo mes</ItemTitle>
                                <ItemBottom hide={lastMonth}>
                                    <PercentIconContainer>
                                        <PercentIcon hide={lastMonth} />
                                    </PercentIconContainer>{lastMonth >= 0 ? `$${lastMonth}` : `-$${lastMonth*-1}`}
                                </ItemBottom>
                            </Item>
                            <Item>
                                <ItemTitle>Ultimos 3 meses</ItemTitle>
                                <ItemBottom hide={lastThreeMonths}>
                                    <PercentIconContainer>
                                        <PercentIcon hide={lastThreeMonths} />
                                    </PercentIconContainer>{lastThreeMonths >= 0 ? `$${lastThreeMonths}` : `-$${lastThreeMonths*-1}`}
                                </ItemBottom>
                            </Item>
                        </Summary>
                        </TotalRevenuesBody>
                    </TotalRevenues>
                    <LastMonthsRevenues>
                        <WidgetTitle style={{marginBottom: '10px'}}>Ultimos 6 meses de ingresos</WidgetTitle>
                        <AreaChart
                            width={730}
                            height={290}
                            data={sixMonths}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                            >
                            <defs>
                                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="gray" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#total)"
                            />
                        </AreaChart>
                    </LastMonthsRevenues>
                </GraphicsContainer>
                <OrdersContainer>
                    <WidgetTitle style={{margin: '0.8rem 2rem'}} >Pedidos</WidgetTitle>
                    <OrdersTable orders={orders} />
                </OrdersContainer>
            </Wrapper>
        </Container>
    </PrivateRoutes>
  )
}

export default Dashboard