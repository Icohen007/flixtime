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
    
    @media only screen and (max-width: 768px) {
    align-items: center;
    margin-top:15rem;
    }
`;

const PanelContainer = styled.div`
    width: 100vw;
    height: 56.17977vw;
    max-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
     @media only screen and (max-width: 768px) {
    margin-top: 65rem;
    }   
.panel-date {
font-size: 22rem;
    @media only screen and (max-width: 768px) {
    display: none;
    }
}

.panel-title {

@media only screen and (min-width: 769px) {
font-size: 44rem;
margin-top: 10rem;
-webkit-text-stroke-width: 2rem;
-webkit-text-stroke-color: #000;
}

@media only screen and (max-width: 768px) {
max-width: 90%;
font-size: 21rem;
}

}

.panel-genres {
font-size: 17rem;
margin-top: 5rem;
    @media only screen and (max-width: 768px) {
    display: none;
    }
}
`;

const PanelDiv = styled.div`
font-weight: 600;
max-width: 50%;

@media only screen and (max-width: 768px) {
max-width: 90%;
}
`;

function Header({
  imageUrl, title, runningDate, id, genreIds, genresMovieMap,
}) {
  const parsedDate = getYearAndMonth(runningDate);
  return (
    <PanelContainer>
      <FeaturedImage src={`https://image.tmdb.org/t/p/original${imageUrl}`} />
      <Panel>
        <PanelDiv className="panel-date">{parsedDate}</PanelDiv>
        <PanelDiv className="panel-title">{ title }</PanelDiv>
        <PanelDiv className="panel-genres">
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
