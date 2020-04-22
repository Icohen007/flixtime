import React from 'react';
import axios from 'axios';
import CarouselContent from '../components/CarouselContent';
import CarouselTrending from '../components/CarouselTrending';

function Home({ movies, shows, trending }) {
  return (
    <>
      <CarouselTrending content={trending} />
      <CarouselContent header="Popular Movies" content={movies} path="/movies" />
      <CarouselContent header="Popular Shows" content={shows} path="/shows" />
    </>
  );
}

Home.getInitialProps = async () => {
  const resposeMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50`);
  const responseShows = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50`);
  const responseTrending = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`);

  const movies = resposeMovies.data.results.map((e) => ({ imageUrl: e.poster_path, title: e.original_title, id: e.id }));
  const shows = responseShows.data.results.map((e) => ({ imageUrl: e.poster_path, title: e.original_name, id: e.id }));
  const trending = responseTrending.data.results.map((e) => ({
    imageUrl: e.backdrop_path, title: e.original_title, releaseDate: e.release_date, id: e.id,
  }));

  return { movies, shows, trending };
};

export default Home;
