import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Inter', sans-serif !important;
  font-size: 1px;
}
*, *:before, *:after {
  box-sizing: inherit;
}

 *{
 font-family: inherit;
 }
body {
  font-family: 'Inter', sans-serif !important;
  font-size: 16rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  background: #0d0d0d;
}

#__next {
height: 100%;
width: 100%;
}

//html, body { // responsive nav bar is 50px height
//scroll-padding-top: 50px;
//}

h1, h2, h3 , h4 ,h5 ,h6 {
margin: 0;
}

a, a:hover, a:focus, a:active  {
text-decoration: none !important;
}
`;

export default GlobalStyle;
