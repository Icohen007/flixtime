import axios from 'axios';

export async function getAll() {
  const requestPopularMovies = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50&page=1`);
  const requestTopRatedMovies = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=vote_average.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=2000&with_original_language=en&page=1`);
  const requestNewReleaseMovies = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=primary_release_date.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50&page=1`);

  const requestTrendingMovies = axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const requestPopularShows = axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50&page=1`);
  const requestTopRatedShows = axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=vote_average.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=2000&with_original_language=en&page=1`);
  const requestNewReleaseShows = axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=primary_release_date.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50&page=1`);
  // const requestTrendingShows = axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  const requestMovieGenres = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`);

  const axiosResponse = await axios.all([
    requestPopularMovies,
    requestTopRatedMovies,
    requestTrendingMovies,
    requestNewReleaseMovies,
    requestPopularShows,
    requestTopRatedShows,
    // requestTrendingShows,
    requestNewReleaseShows,
    requestMovieGenres,
  ]);

  const responsePopularMovies = axiosResponse[0];
  const responseTopRatedMovies = axiosResponse[1];
  const responseTrendingMovies = axiosResponse[2];
  const responseNewReleaseMovies = axiosResponse[3];
  const responsePopularShows = axiosResponse[4];
  const responseTopRatedShows = axiosResponse[5];
  const responseNewReleaseShows = axiosResponse[6];
  const responseMovieGenres = axiosResponse[7];

  const popularMovies = responsePopularMovies.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_title, id: e.id, releaseDate: e.release_date,
  }));

  const topRatedMovies = responseTopRatedMovies.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_title, id: e.id, releaseDate: e.release_date,
  }));

  const trendingMovies = responseTrendingMovies.data.results.map((e) => ({
    coverImageUrl: e.backdrop_path,
    imageUrl: e.poster_path,
    title: e.original_title,
    releaseDate: e.release_date,
    id: e.id,
    genreIds: e.genre_ids,
  }));

  const newReleaseMovies = responseNewReleaseMovies.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_title, id: e.id, releaseDate: e.release_date,
  }));

  const popularShows = responsePopularShows.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_name, releaseDate: e.first_air_date, id: e.id,
  }));
  const topRatedShows = responseTopRatedShows.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_name, releaseDate: e.first_air_date, id: e.id,
  }));
  const newReleaseShows = responseNewReleaseShows.data.results.map((e) => ({
    imageUrl: e.poster_path, title: e.original_name, releaseDate: e.first_air_date, id: e.id,
  }));
  // const trendingShows = responseTrendingShows.data.results.map((e) => ({
  //   imageUrl: e.backdrop_path, title: e.original_name, releaseDate: e.first_air_date, id: e.id,
  // }));

  const genresMovieMap = responseMovieGenres.data.genres.reduce((acc, cur) => {
    acc[cur.id] = cur.name;
    return acc;
  }, {});

  return {
    popularMovies,
    topRatedMovies,
    trendingMovies,
    newReleaseMovies,
    popularShows,
    topRatedShows,
    newReleaseShows,
    // trendingShows,
    genresMovieMap,
  };
}

export async function getDetails(id, mediaType) {
  const requestDetails = axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.API_KEY}&language=en-US`);
  const requestCredits = axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.API_KEY}`);
  const requestTrailers = axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`);
  const requestReviews = axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/reviews?api_key=${process.env.API_KEY}&language=en-US&page=1`);

  const axiosResponse = await axios.all(
    [requestDetails,
      requestCredits,
      requestTrailers,
      requestReviews,
    ],
  );

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

export async function getList(page, sortBy, genre, mediaType) {
  let requestSorted;

  if (sortBy !== 'vote_average.desc') {
    requestSorted = axios.get(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=${sortBy}${genre ? `&with_genres=${genre}` : ''}&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50`);
  } else {
    requestSorted = axios.get(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.API_KEY}&language&language=en-US&sort_by=${sortBy}${genre ? `&with_genres=${genre}` : ''}&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=200&with_original_language=en`);
  }

  const requestGenres = axios.get(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${process.env.API_KEY}&language=en-US`);

  const axiosResponse = await axios.all([requestSorted, requestGenres]);
  const [responseSorted, responseGenres] = axiosResponse;


  let sorted;

  if (mediaType === 'movie') {
    sorted = responseSorted.data.results.map((e) => ({
      imageUrl: e.poster_path, title: e.original_title, id: e.id, releaseDate: e.release_date,
    }));
  } else {
    sorted = responseSorted.data.results.map((e) => ({
      imageUrl: e.poster_path, title: e.original_name, id: e.id, releaseDate: e.first_air_date,
    }));
  }

  const genresOptions = responseGenres.data.genres.map((genre) => ({ label: genre.name, value: genre.id }));
  return { sorted, genresOptions, totalPages: responseSorted.data.total_pages };
}

export async function getSearch(term) {
  const responseSearch = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&query=${term}&page=1&include_adult=false`);
  const searchResults = responseSearch.data.results.filter((e) => e.media_type !== 'person').map((e) => (
    {
      id: e.id,
      imageUrl: e.poster_path,
      title: e.media_type === 'movie' ? e.original_title : e.original_name,
      releaseDate: e.media_type === 'movie' ? e.release_date : e.first_air_date,
      mediaType: e.media_type === 'movie' ? 'movie' : 'show',
    }
  ));

  return { searchResults };
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
