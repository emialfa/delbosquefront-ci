import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    margin: auto;
    top: 3%;
    left: 50%;
    width: 400px;
    margin-left: -200px;
    align-items: center;
    padding: 20px 80px;
    position: fixed;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
`

const Welcome:React.FC = () => {
    return (
        <>
        <Container>
            ¡Bienvenide!
        </Container>
        </>
        
    )
}

export default Welcome
