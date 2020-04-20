import styled from 'styled-components';

const StyledClientItem = styled.div`
//height: 190px;
//width: 150px;
//overflow: hidden;
padding: 6rem;

img {
min-width: 168rem;
min-height: 252rem;
max-height: 252rem;
max-width: 13vw;
border-radius: 8rem;


@media only screen and (max-width: 1230px) {
max-width: 20vw;
}

@media only screen and (max-width: 600px) {
max-width: 40vw;
}


}
`;

export default StyledClientItem;
