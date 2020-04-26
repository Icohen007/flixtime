import styled from 'styled-components';
import { getYearAndMonth } from '../utils/formatUtils';
import FeaturedButton from './FeaturedButton';
import SwipeSVG from './SwipeSVG';

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

-webkit-text-stroke-width: ${(props) => props.textBorder};
-webkit-text-stroke-color: #000;
`;

function Header({
  imageUrl, title, releaseDate, id, genreIds, genresMovieMap,
}) {
  const parsedDate = getYearAndMonth(releaseDate);
  return (
    <PanelContainer>
      <FeaturedImage src={`https://image.tmdb.org/t/p/original${imageUrl}`} />
      <Panel>
        <PanelDiv fontSize="22rem" textBorder="0.6rem">{parsedDate}</PanelDiv>
        <PanelDiv fontSize="44rem" marginTop="10rem" textBorder="2rem">{ title }</PanelDiv>
        <PanelDiv fontSize="17rem" marginTop="5rem">
          {genreIds.slice(0, 3).map((genre) => genresMovieMap[genre]).join(' • ')}
        </PanelDiv>
        <FeaturedButton id={id}>
          Check it out!
        </FeaturedButton>
        <SwipeSVG className="cover" />
      </Panel>

    </PanelContainer>
  );
}

export default Header;
