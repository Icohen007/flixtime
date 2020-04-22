import styled from 'styled-components';
import getParsedDate from '../utils/date';

const Title = styled.h1`
  font-size: 50rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const HeaderContainer = styled.div`
display: block;
align-items: center;
position: relative;
width: 100%;
height: 100%;
`;

const FeaturedImage = styled.img`
width: 100%;
max-height: 100vh;
height: auto;
object-fit: cover;
object-position: top;
filter: brightness(50%);
position: absolute;
z-index: -1;
margin: 0 auto;

@media only screen and (max-width: 786px) {
width: 90%;
border-radius: 10%;
margin: 65rem auto 0;
}

`;

const Panel = styled.div`
position: absolute;
    max-width: 80vw;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.primary};
`;

const PanelContainer = styled.div`
    width: 100vw;
    height: 56.17977vw;
    max-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
`;

const PanelDiv = styled.div`
margin-top: ${(props) => props.marginTop};
font-size: ${(props) => props.fontSize};
font-weight: 600;
max-width: 50%;
`;

function Header({
  imageUrl, title, releaseDate,
}) {
  const parsedDate = getParsedDate(releaseDate);
  return (
    <PanelContainer>
      <FeaturedImage src={`https://image.tmdb.org/t/p/original${imageUrl}`} />
      <Panel>
        <PanelDiv fontSize="22rem">{parsedDate}</PanelDiv>
        <PanelDiv fontSize="42rem" marginTop="15rem">{ title }</PanelDiv>
        <PanelDiv fontSize="16rem" marginTop="5rem"> Adventure • Comedy • Fantasy </PanelDiv>
      </Panel>
    </PanelContainer>
  );
}

export default Header;
