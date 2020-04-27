import axios from 'axios';

export async function getAll() {
  const requestPopularMovies = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50&page=1`);
  const requestTopRatedMovies = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&vote_count.gte=2000&with_original_language=en&page=1`);
  const requestTrendingMovies = axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const requestPopularShows = axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50&page=1`);
  const requestTopRatedShows = axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1&region=US`);
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
    coverImageUrl: e.backdrop_path,
    imageUrl: e.poster_path,
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

export async function getDetails(id, mediaType) {
  const requestDetails = axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.API_KEY}&language=en-US`);
  const requestCredits = axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.API_KEY}`);
  const requestTrailers = axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`);
  const requestReviews = axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/reviews?api_key=${process.env.API_KEY}&language=en-US&page=1`);

  const axiosResponse = await axios.all([requestDetails, requestCredits, requestTrailers, requestReviews]);

  const responseDetails = axiosResponse[0];
  const responseCredits = axiosResponse[1];
  const responseTrailers = axiosResponse[2];
  const responseReviews = axiosResponse[3];

  return {
    details: responseDetails.data,
    credits: responseCredits.data,
    trailers: responseTrailers.data.results,
    reviews: responseReviews.data.results,
  };
}

export async function getPopular(page, mediaType) {
  const responsePopular = await axios.get(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50`);

  let popular;

  if (mediaType === 'movie') {
    popular = responsePopular.data.results.map((e) => ({
      imageUrl: e.poster_path, title: e.original_title, id: e.id, releaseDate: e.release_date,
    }));
  } else {
    popular = responsePopular.data.results.map((e) => ({
      imageUrl: e.poster_path, title: e.original_name, id: e.id, runningDate: e.first_air_date,
    }));
  }

  return { popular, totalPages: responsePopular.data.total_pages };
}

// export async function getMovie() {
//
// }
//
// export async function getMovie() {
//
// }
//
// export async function getMovie() {
//
// }