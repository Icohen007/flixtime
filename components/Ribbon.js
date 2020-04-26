import styled from 'styled-components';

const RibbonStyled = styled.div`

  width: 150px;
  height: 150px;
  overflow: hidden;
  position: absolute;


&::before,
&::after {
  position: absolute;
  z-index: -1;
  content: '';
  display: block;
  border: 5px solid #2980b9;
}

span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 15px 0;
  background-color: #3498db;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  color: #fff;
  font: 700 18px/1 'Lato', sans-serif;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: uppercase;
  text-align: center;
}


  top: -10px;
  right: -10px;

&::before,
&::after {
  border-top-color: transparent;
  border-right-color: transparent;
}
&::before {
  top: 0;
  left: 0;
}
&::after {
  bottom: 0;
  right: 0;
}
span {
  left: -25px;
  top: 30px;
  transform: rotate(45deg);
}

`;


function Ribbon() {
  return (
    <RibbonStyled><span>ribbon</span></RibbonStyled>
  );
}

export default Ribbon;
