import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import CarouselContent from '../components/CarouselContent';
import CarouselTrending from '../components/CarouselTrending';
import baseUrl from '../utils/baseUrl';
import { ALL_ROUTE } from './api/routes';


const ButtonGroupContainer = styled.div`
display: flex;
justify-content: center;
margin: 40rem 0;
`;

function Home({
  popularMovies,
  topRatedMovies,
  trendingMovies,
  newReleaseMovies,
  popularShows,
  topRatedShows,
  // trendingShows,
  newReleaseShows,
  genresMovieMap,
}) {
  const [showMovies, setShowMovies] = useState(true);

  return (
    <>
      <CarouselTrending content={trendingMovies} genresMovieMap={genresMovieMap} />
      <ButtonGroupContainer>
        <Button.Group>
          <Button active={showMovies} onClick={() => setShowMovies(true)}>Movies</Button>
          <Button active={!showMovies} onClick={() => setShowMovies(false)}>Shows</Button>
        </Button.Group>
      </ButtonGroupContainer>
      {showMovies ? (
        <>
          <CarouselContent header="Popular Movies" linkPath="/movies" content={popularMovies} mediaType="movie" />
          <CarouselContent header="Top Rated Movies" linkPath="/movies?sortBy=vote_average.desc&page=1" content={topRatedMovies} mediaType="movie" />
          {/* <CarouselContent header="Trending Movies" content={trendingMovies} mediaType="movie" /> */}
          <CarouselContent header="New Release Movies" linkPath="/movies?sortBy=primary_release_date.desc&page=1" content={newReleaseMovies} mediaType="movie" />
        </>
      )
        : (
          <>
            <CarouselContent header="Popular Shows" linkPath="/shows" content={popularShows} mediaType="show" />
            <CarouselContent header="Top Rated Shows" linkPath="/shows?sortBy=vote_average.desc&page=1" content={topRatedShows} mediaType="show" />
            {/* <CarouselContent header="Trending Shows" content={trendingShows} mediaType="show" /> */}
            <CarouselContent header="New Release Shows" linkPath="shows?sortBy=primary_release_date.desc&page=1" content={newReleaseShows} mediaType="show" />
          </>
        )}
    </>
  );
}

Home.getInitialProps = async () => {
  const responseAll = await axios.get(`${baseUrl}/api?route=${ALL_ROUTE}`);
  return responseAll.data;
};

export default Home;
