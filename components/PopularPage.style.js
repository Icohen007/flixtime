import styled from 'styled-components';

export const FireText = styled.div`
width: 700rem;
margin: 100rem auto 30rem;

h2 {
color: #fff;
font-size: 80rem;
text-align: center;
font-weight: 400;
font-family: Luckiest Guy, sans-serif;
text-transform: uppercase;
letter-spacing: 2rem;

span{
display: block;
background-image: url(/fire.jpg);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
backface-visibility: hidden;
animation: fire 5s linear infinite;
}

@keyframes fire {
0% {
background-position: 100% -50%;
}
}

}
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 15px;
  grid-row-gap: 30px;
  align-items: baseline;
  justify-content: space-evenly;
  margin: 0 auto;
`;

export const GridContainer = styled.div`
   flex-direction: column;
   max-width: 1150px;
   width: 100%;
   margin: auto;
   padding: 10rem;
   justify-content: center;
   text-align: center;
`;
