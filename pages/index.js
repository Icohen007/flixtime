import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import CarouselContent from '../components/CarouselContent';
import CarouselTrending from '../components/CarouselTrending';


const ButtonGroupContainer = styled.div`
display: flex;
justify-content: center;
margin-top: 60rem;
`;


function Home({
  popularMovies, topRatedMovies, trendingMovies, popularShows, topRatedShows, trendingShows, genresMovieMap,
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
          <CarouselContent header="Popular Movies" content={popularMovies} mediaType="movie" />
          <CarouselContent header="Top Rated Movies" content={topRatedMovies} mediaType="movie" />
          <CarouselContent header="Trending Movies This Week" content={trendingMovies} mediaType="movie" />
        </>
      )
        : (
          <>
            <CarouselContent header="Popular Shows" content={popularShows} mediaType="show" />
            <CarouselContent header="Top Rated Shows" content={topRatedShows} mediaType="show" />
            <CarouselContent header="Trending Shows This Week" content={trendingShows} mediaType="show" />
          </>
        )}
    </>
  );
}

Home.getInitialProps = async () => {
  const responsePopularMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50&page=1`);
  const responseTopRatedMovies = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const responsePopularShows = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50&page=1`);
  const responseTopRatedShows = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const responseTrendingMovies = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const responseTrendingShows = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}&language=en-US&page=1`);

  const popularMovies = responsePopularMovies.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_title, id: e.id, runningDate: e.release_date,
  }));

  const topRatedMovies = responseTopRatedMovies.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_title, id: e.id, runningDate: e.release_date,
  }));
  const trendingMovies = responseTrendingMovies.data.results.map((e) => ({
    imageUrl: e.backdrop_path, title: e.original_title, runningDate: e.release_date, id: e.id, genreIds: e.genre_ids,
  }));
  const popularShows = responsePopularShows.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_name, id: e.id, runningDate: e.first_air_date,
  }));
  const topRatedShows = responseTopRatedShows.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_name, id: e.id, runningDate: e.first_air_date,
  }));
  const trendingShows = responseTrendingShows.data.results.map((e) => ({
    imageUrl: e.backdrop_path, title: e.original_name, runningDate: e.first_air_date, id: e.id,
  }));


  const movieGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`);

  const genresMovieMap = movieGenres.data.genres.reduce((acc, cur) => {
    acc[cur.id] = cur.name;
    return acc;
  }, {});

  return {
    popularMovies, topRatedMovies, popularShows, trendingMovies, topRatedShows, trendingShows, genresMovieMap,
  };
};

export default Home;
