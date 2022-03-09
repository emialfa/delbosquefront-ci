import styled from "styled-components"

const Spin = styled.div`
  border: 4px solid rgba(0, 0, 0, .1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #99877D;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -18px;
  margin-left: -18px;

  animation: spin 1s ease infinite;
`
const Loader = () => {
    return (
        <Spin />
        )
}

export default Loader
