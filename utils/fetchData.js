const TMDB_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'en-US';

async function tmdbGet(path, params = {}) {
  if (!process.env.API_KEY) {
    throw new Error('TMDB API key is not configured');
  }

  const url = new URL(`${TMDB_URL}/${path}`);
  Object.entries({ api_key: process.env.API_KEY, language: LANGUAGE, ...params }).forEach(([key, value]) => {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value));
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  let response;

  try {
    response = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('TMDB returned an error');
    return await response.json();
  } catch (error) {
    // Never log the URL or the original error: the URL contains the API key.
    console.error(`TMDB ${path} failed (HTTP ${response && !response.ok ? response.status : 'unavailable'})`);
    const unavailable = new Error(`TMDB ${path} is unavailable`);
    unavailable.status = response ? response.status : undefined;
    throw unavailable;
  } finally {
    clearTimeout(timeout);
  }
}

const responseToObject = (mediaType) => (data) => data.results.map((item) => ({
  id: item.id,
  imageUrl: item.poster_path,
  title: mediaType === 'movie' ? item.original_title : item.original_name,
  releaseDate: mediaType === 'movie' ? item.release_date : item.first_air_date,
}));

const transformResponseMovie = responseToObject('movie');
const transformResponseShow = responseToObject('tv');

function discoverParams(mediaType, sortBy, voteCount, extra = {}) {
  return {
    sort_by: sortBy,
    'vote_count.gte': voteCount,
    ...(mediaType === 'tv' ? { timezone: 'America/New_York', include_null_first_air_dates: false } : {}),
    ...extra,
  };
}

export async function getAll() {
  const requests = [
    tmdbGet('discover/movie', discoverParams('movie', 'popularity.desc', 50, { page: 1 })),
    tmdbGet('discover/movie', discoverParams('movie', 'vote_average.desc', 2000, { with_original_language: 'en', page: 1 })),
    tmdbGet('trending/movie/week', { page: 1 }),
    tmdbGet('discover/movie', discoverParams('movie', 'primary_release_date.desc', 50, { page: 1 })),
    tmdbGet('discover/tv', discoverParams('tv', 'popularity.desc', 50, { page: 1 })),
    tmdbGet('discover/tv', discoverParams('tv', 'vote_average.desc', 2000, { with_original_language: 'en', page: 1 })),
    tmdbGet('discover/tv', discoverParams('tv', 'first_air_date.desc', 50, { page: 1 })),
    tmdbGet('genre/movie/list'),
  ];

  // A single failed list should not hide all the other home-page sections.
  const responses = await Promise.all(requests.map((request) => request.catch(() => null)));
  const [popularMoviesData, topRatedMoviesData, trendingMoviesData, newReleaseMoviesData,
    popularShowsData, topRatedShowsData, newReleaseShowsData, movieGenresData] = responses;

  if (responses.slice(0, 7).every((data) => !data)) {
    throw new Error('TMDB home-page data is unavailable');
  }

  const movieResults = (data) => (data ? transformResponseMovie(data) : []);
  const showResults = (data) => (data ? transformResponseShow(data) : []);
  const trendingMovies = trendingMoviesData ? trendingMoviesData.results.map((item) => ({
    coverImageUrl: item.backdrop_path,
    imageUrl: item.poster_path,
    title: item.original_title,
    releaseDate: item.release_date,
    id: item.id,
    genreIds: item.genre_ids,
  })) : [];
  const genresMovieMap = movieGenresData ? movieGenresData.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {}) : {};

  return {
    popularMovies: movieResults(popularMoviesData),
    topRatedMovies: movieResults(topRatedMoviesData),
    trendingMovies,
    newReleaseMovies: movieResults(newReleaseMoviesData),
    popularShows: showResults(popularShowsData),
    topRatedShows: showResults(topRatedShowsData),
    newReleaseShows: showResults(newReleaseShowsData),
    genresMovieMap,
    isPartial: responses.some((data) => !data),
  };
}

export async function getDetails(id, mediaType) {
  if (!['movie', 'tv'].includes(mediaType) || !/^[1-9]\d*$/.test(String(id))) {
    throw new Error('Invalid TMDB media identifier');
  }

  const data = await tmdbGet(`${mediaType}/${id}`, { append_to_response: 'credits,videos,reviews' });
  return {
    details: data,
    credits: data.credits,
    trailers: data.videos.results,
    reviews: data.reviews.results,
  };
}

export async function getList(page, sortBy, genre, mediaType) {
  const [data, genres] = await Promise.all([
    tmdbGet(`discover/${mediaType}`, discoverParams(
      mediaType,
      sortBy,
      sortBy === 'vote_average.desc' ? 200 : 50,
      {
        page,
        ...(genre ? { with_genres: genre } : {}),
        ...(sortBy === 'vote_average.desc' ? { with_original_language: 'en' } : {}),
      },
    )),
    tmdbGet(`genre/${mediaType}/list`),
  ]);

  return {
    sorted: responseToObject(mediaType)(data),
    genresOptions: genres.genres.map((item) => ({ label: item.name, value: item.id })),
    totalPages: data.total_pages,
  };
}

export async function getSearch(term) {
  const data = await tmdbGet('search/multi', { query: term, page: 1, include_adult: false });
  const searchResults = data.results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv').map((item) => ({
    id: item.id,
    imageUrl: item.poster_path,
    title: item.media_type === 'movie' ? item.original_title : item.original_name,
    releaseDate: item.media_type === 'movie' ? item.release_date : item.first_air_date,
    mediaType: item.media_type === 'movie' ? 'movie' : 'show',
  }));

  return { searchResults };
}
