import axios from 'axios';
import SortPage, { getOption } from '../components/SortPage';
import baseUrl from '../utils/baseUrl';
import { LIST_ROUTE } from './api/routes';
import redirect from '../utils/redirect';

export const sortOptions = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Release date', value: 'primary_release_date.desc' },
  { label: 'Rating', value: 'vote_average.desc' },
  { label: 'Revenue', value: 'revenue.desc' },
];

function Movies({
  movies, mediaType, totalPages, genresOptions,
}) {
  return (
    <SortPage
      results={movies}
      sortOptions={sortOptions}
      mediaType={mediaType}
      totalPages={totalPages}
      genresOptions={genresOptions}
    />
  );
}

Movies.getInitialProps = async (ctx) => {
  const { page = '1', sortBy = 'popularity.desc', genre = '' } = ctx.query;
  const sortOption = getOption(sortOptions, sortBy);
  if (!sortOption) {
    redirect(ctx, '/movies');
  }

  const url = new URL(baseUrl);
  url.searchParams.append('route', LIST_ROUTE);
  url.searchParams.append('mediaType', 'movie');
  url.searchParams.append('sortBy', sortOption.value);
  if (genre) {
    url.searchParams.append('genre', genre);
  }
  url.searchParams.append('page', page);

  const responseSorted = await axios.get(url.href);
  const { sorted, genresOptions, totalPages } = responseSorted.data;
  if (!sorted.length) {
    redirect(ctx, '/movies');
  }
  const mediaType = 'movie';
  return {
    movies: sorted, mediaType, totalPages: Math.min(totalPages, 10), genresOptions,
  };
};

export default Movies;
