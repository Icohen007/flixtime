import React from 'react';
import styled from 'styled-components';
import Rating from './Rating';
import Chip from './Chip.style';

const MovieHeader = styled.header`
    padding-top: 50rem;
    padding-left: 70rem;
    max-width: 900rem;
    color: #fff;
`;

const MovieTitle = styled.span`
    font-weight: 700;
    font-size: 35rem;
    line-height: 1.1;
`;

const GenresContainer = styled.div`
display: flex;
justify-content: flex-start;
margin-top: 10rem;
`;

const HeaderContainer = styled.div`
height: 70vh;
display: flex;
align-items: center;
position: relative;
`;

const Cover = styled.div`
background: linear-gradient(90deg, rgb(13, 13, 13), rgba(255, 255, 255, 0.05)), url(${(props) => `https://image.tmdb.org/t/p/original${props.imageUrl}`}) no-repeat top center / cover;
width: 70%;
//max-height: 60vh;
height: 70vh;
position: absolute;
top: 0;
right: 0;
z-index: -1;
`;


function HeaderDetails({
  name, rating, genres, coverImage, children,
}) {
  return (
    <HeaderContainer>
      <MovieHeader>
        <MovieTitle>
          {name}
          {rating !== 0 && <Rating rating={rating} />}
        </MovieTitle>
        <GenresContainer>
          {genres.slice(0, 3).map(((genre) => <Chip key={genre.id}>{genre.name}</Chip>))}
        </GenresContainer>
        {children}
      </MovieHeader>
      <Cover imageUrl={coverImage} />
    </HeaderContainer>
  );
}

export default HeaderDetails;
