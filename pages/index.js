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
  movies, shows, trending, genresMovieMap,
}) {
  const [showMovies, setShowMovies] = useState(true);

  return (
    <>
      <CarouselTrending content={trending} genresMovieMap={genresMovieMap} />
      <ButtonGroupContainer>
        <Button.Group>
          <Button active={showMovies} onClick={() => setShowMovies(true)}>Movies</Button>
          <Button active={!showMovies} onClick={() => setShowMovies(false)}>Shows</Button>
        </Button.Group>
      </ButtonGroupContainer>
      {showMovies && <CarouselContent header="Popular Movies" content={movies} mediaType="movie" />}
      {!showMovies && <CarouselContent header="Popular Shows" content={shows} mediaType="show" />}
    </>
  );
}

Home.getInitialProps = async () => {
  const resposeMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50`);
  const responseShows = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50`);
  const responseTrending = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`);

  const movies = resposeMovies.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_title, id: e.id, runningDate: e.release_date,
  }));
  const shows = responseShows.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_name, id: e.id, runningDate: e.first_air_date,
  }));
  const trending = responseTrending.data.results.map((e) => ({
    imageUrl: e.backdrop_path, title: e.original_title, releaseDate: e.release_date, id: e.id, genreIds: e.genre_ids,
  }));

  const movieGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`);

  const genresMovieMap = movieGenres.data.genres.reduce((acc, cur) => {
    acc[cur.id] = cur.name;
    return acc;
  }, {});

  return {
    movies, shows, trending, genresMovieMap,
  };
};

export default Home;
