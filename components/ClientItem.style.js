import styled from 'styled-components';

const StyledClientItem = styled.div`

img {
width: 100%;
max-width: 168rem;
min-height: 252rem;
max-height: 252rem;
border-radius: 8rem;
object-fit: cover;
user-select: none;
cursor: pointer;
filter: brightness(80%);
transition: all 0.2s ease-out;

&:hover {
filter: brightness(100%);
border: 0.8rem solid darkorange;
padding: 0.8rem;
}


//@media only screen and (max-width: 1230px) {
//max-width: 20vw;
//}
//
//@media only screen and (max-width: 600px) {
//max-width: 40vw;
//}


}
`;

export default StyledClientItem;