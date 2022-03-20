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
    ResponsiveContainer,
  } from "recharts";

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
`
const Widget = styled.div`
    display: flex;
    width: 191px;
    height: 109px;
    background-color: white;
    box-shadow: 0px 3.91413px 9.78532px rgba(0, 0, 0, 0.15);
    border-radius: 19.5706px;
    margin: 0px 10px;
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
    color: #545454;
`
const Percent = styled.div<{hide: number}>`
    font-weight: 800;
    font-size: 13.6994px;
    line-height: 17px;
    color: ${props => props.hide >= 0 ? '#4CAF50' : '#F25F4B'};
    display: flex;
    justify-content: space-between;
    width: 40px;
    align-items: center;
`
const PercentIconContainer = styled.div`
    display: flex;
    height: 100%;
    position: relative;
`
const PercentIcon = styled.div<{hide: number}>`
    width: 6.99px;
    height: 6.99px;
    content: '';
	border-width: ${(props) => props.hide >= 0 ? '.4vmin .4vmin 0 0' : ' 0 0 .4vmin .4vmin'};
    border-style: solid;
	display: block;
    transform-origin: 100% 0;
    transform: rotate(-45deg);
    position: absolute;
    top: ${props => props.hide >= 0 ? '30%' : '20%'};
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
`
const Icon = styled.img`

`
const GraphicsContainer = styled.div`
    display: flex;
    width: 100%;
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
`
const ItemBottom = styled.div<{hide:number}>`
    display: flex;
    justify-content: center;
    color: ${props => props.hide >= 0 ? '#4CAF50' : '#F25F4B'};
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
const data = [
    { name: "Enero", Total: 1200 },
    { name: "Febrero", Total: 2100 },
    { name: "Marzo", Total: 800 },
    { name: "Abril", Total: 1600 },
    { name: "Mayo", Total: 900 },
    { name: "Junio", Total: 1700 },
  ];

const Dashboard = () => {
  return (
    <PrivateRoutes admin={true}>
        <Topbar />
        <Container>
            <Title>Dashboard</Title>
            <Wrapper>
                <WidgetContainer>
                    <Widget>
                        <Top>
                            <WidgetTitle>Usuarios</WidgetTitle>
                            <Percent hide={-20}><PercentIconContainer><PercentIcon hide={-20} /></PercentIconContainer>20%</Percent>
                        </Top>
                        <Center>15</Center>
                        <Bottom>
                            <Detail>Ver todos</Detail>
                            <Icon src='/assets/usersIcon.svg'/>
                        </Bottom>
                    </Widget>
                    <Widget>
                        <Top>
                            <WidgetTitle>Pedidos</WidgetTitle>
                            <Percent hide={20}><PercentIconContainer><PercentIcon hide={20}/></PercentIconContainer>20%</Percent>
                        </Top>
                        <Center>15</Center>
                        <Bottom>
                            <Detail>Ver todos</Detail>
                            <Icon src='/assets/ordersIcon.svg'/>
                        </Bottom>
                    </Widget>
                    <Widget>
                        <Top>
                            <WidgetTitle>Ganancias</WidgetTitle>
                            <Percent hide={20}><PercentIconContainer><PercentIcon hide={20}/></PercentIconContainer>20%</Percent>
                        </Top>
                        <Center>15</Center>
                        <Bottom>
                            <Detail>Ver detalle</Detail>
                            <Icon src='/assets/revenueIcon.svg' />
                        </Bottom>
                    </Widget>
                    <Widget>
                        <Top>
                            <WidgetTitle>Balance</WidgetTitle>
                            <Percent hide={20}><PercentIconContainer><PercentIcon hide={20}/></PercentIconContainer>20%</Percent>
                        </Top>
                        <Center>15</Center>
                        <Bottom>
                            <Detail>Ver detalle</Detail>
                            <Icon src='/assets/balanceIcon.svg'/>
                        </Bottom>
                    </Widget>
                </WidgetContainer>
                <GraphicsContainer>
                    <TotalRevenues>
                        <WidgetTitle>Ingresos totales</WidgetTitle>
                        <TotalRevenuesBody>
                            <CircularProgressBarContainer>
                                <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
                            </CircularProgressBarContainer>
                        <TotalRevenuesSubtitle>Total de ventas del día</TotalRevenuesSubtitle>
                        <TotalRevenuesAmount>$800</TotalRevenuesAmount>
                        <TotalRevenuesDesc>Transacciones procesadas anteriormente. Quizas no figuren los ultimos pagos realizados.</TotalRevenuesDesc>
                        <Summary>
                            <Item>
                                <ItemTitle>Ultima semana</ItemTitle>
                                <ItemBottom hide={20}>
                                    <PercentIconContainer style={{marginRight: '15px'}}>
                                        <PercentIcon hide={20} />
                                    </PercentIconContainer>
                                    <ItemAmount>$500</ItemAmount>
                                </ItemBottom>
                            </Item>
                            <Item>
                                <ItemTitle>Ultimo mes</ItemTitle>
                                <ItemBottom hide={20}>
                                    <PercentIconContainer style={{marginRight: '15px'}}>
                                        <PercentIcon hide={20} />
                                    </PercentIconContainer>
                                    <ItemAmount>$1000</ItemAmount>
                                </ItemBottom>
                            </Item>
                            <Item>
                                <ItemTitle>Ultimos 3 meses</ItemTitle>
                                <ItemBottom hide={20}>
                                    <PercentIconContainer style={{marginRight: '15px'}}>
                                        <PercentIcon hide={20} />
                                    </PercentIconContainer>
                                    <ItemAmount>$100</ItemAmount>
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
                            data={data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                            >
                            <defs>
                                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="gray" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="Total"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#total)"
                            />
                        </AreaChart>
                    </LastMonthsRevenues>
                </GraphicsContainer>
            </Wrapper>
        </Container>
    </PrivateRoutes>
  )
}

export default Dashboard