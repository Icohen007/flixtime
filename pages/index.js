import React from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Main from '../components/Main';

function Home({ movies }) {
  return (
    <>
      <Header />
      <Main movies={movies} />
    </>
  );
}

Home.getInitialProps = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=c7aa33449f12a7ab44423f6eedd5b412&language&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50');
  return { movies: response.data.results };
};

export default Home;
