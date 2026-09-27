import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import CarouselContent from '../components/Shared/Carousel/CarouselContent';
import CarouselTrending from '../components/Home/CarouselTrending';
import { getAll } from '../utils/fetchData';
import ServiceUnavailable from '../components/_App/ServiceUnavailable';
import unavailableProps from '../utils/serverResponse';

const PartialNotice = styled.div`
  max-width: 800rem;
  margin: 90rem auto 0;
  padding: 16rem;
  color: #fff;
  text-align: center;
`;

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
  newReleaseShows,
  genresMovieMap,
  isPartial,
  tmdbUnavailable,
}) {
  const [showMovies, setShowMovies] = useState(true);

  if (tmdbUnavailable) return <ServiceUnavailable />;

  return (
    <>
      {isPartial && <PartialNotice role="status">Some sections could not be loaded. Please try again shortly.</PartialNotice>}
      {trendingMovies.length > 0 && <CarouselTrending content={trendingMovies} genresMovieMap={genresMovieMap} />}
      <ButtonGroupContainer>
        <Button.Group>
          <Button active={showMovies} onClick={() => setShowMovies(true)}>Movies</Button>
          <Button active={!showMovies} onClick={() => setShowMovies(false)}>TV Shows</Button>
        </Button.Group>
      </ButtonGroupContainer>
      {showMovies ? (
        <>
          {popularMovies.length > 0 && <CarouselContent header="Popular Movies" linkPath="/movies" content={popularMovies} mediaType="movie" />}
          {topRatedMovies.length > 0 && <CarouselContent header="Top Rated Movies" linkPath="/movies?sortBy=vote_average.desc&page=1" content={topRatedMovies} mediaType="movie" />}
          {newReleaseMovies.length > 0 && <CarouselContent header="New Release Movies" linkPath="/movies?sortBy=primary_release_date.desc&page=1" content={newReleaseMovies} mediaType="movie" />}
        </>
      )
        : (
          <>
            {popularShows.length > 0 && <CarouselContent header="Popular TV Shows" linkPath="/shows" content={popularShows} mediaType="show" />}
            {topRatedShows.length > 0 && <CarouselContent header="Top Rated TV Shows" linkPath="/shows?sortBy=vote_average.desc&page=1" content={topRatedShows} mediaType="show" />}
            {newReleaseShows.length > 0 && <CarouselContent header="New Release TV Shows" linkPath="/shows?sortBy=first_air_date.desc&page=1" content={newReleaseShows} mediaType="show" />}
          </>
        )}
    </>
  );
}
export async function getServerSideProps(ctx) {
  try {
    const responseAll = await getAll();
    ctx.res.setHeader('Cache-Control', responseAll.isPartial
      ? 'no-store'
      : 'public, s-maxage=60, stale-while-revalidate=300');
    return { props: responseAll };
  } catch (error) {
    return unavailableProps(ctx);
  }
}

export default Home;
