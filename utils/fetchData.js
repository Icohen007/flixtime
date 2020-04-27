import axios from 'axios';

export async function getAll() {
  const requestPopularMovies = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50&page=1`);
  const requestTopRatedMovies = axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const requestTrendingMovies = axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const requestPopularShows = axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50&page=1`);
  const requestTopRatedShows = axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const requestTrendingShows = axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const requestMovieGenres = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`);

  const axiosResponse = await axios.all([
    requestPopularMovies,
    requestTopRatedMovies,
    requestTrendingMovies,
    requestPopularShows,
    requestTopRatedShows,
    requestTrendingShows,
    requestMovieGenres,
  ]);

  const responsePopularMovies = axiosResponse[0];
  const responseTopRatedMovies = axiosResponse[1];
  const responseTrendingMovies = axiosResponse[2];
  const responsePopularShows = axiosResponse[3];
  const responseTopRatedShows = axiosResponse[4];
  const responseTrendingShows = axiosResponse[5];
  const responseMovieGenres = axiosResponse[6];

  const popularMovies = responsePopularMovies.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_title, id: e.id, runningDate: e.release_date,
  }));

  const topRatedMovies = responseTopRatedMovies.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_title, id: e.id, runningDate: e.release_date,
  }));
  const trendingMovies = responseTrendingMovies.data.results.map((e) => ({
    imageUrl: e.backdrop_path,
    title: e.original_title,
    runningDate: e.release_date,
    id: e.id,
    genreIds: e.genre_ids,
  }));
  const popularShows = responsePopularShows.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_name, runningDate: e.first_air_date, id: e.id,
  }));
  const topRatedShows = responseTopRatedShows.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_name, runningDate: e.first_air_date, id: e.id,
  }));
  const trendingShows = responseTrendingShows.data.results.map((e) => ({
    imageUrl: e.backdrop_path, title: e.original_name, runningDate: e.first_air_date, id: e.id,
  }));

  const genresMovieMap = responseMovieGenres.data.genres.reduce((acc, cur) => {
    acc[cur.id] = cur.name;
    return acc;
  }, {});

  return {
    popularMovies, topRatedMovies, popularShows, trendingMovies, topRatedShows, trendingShows, genresMovieMap,
  };
}
