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

function Movies({ movies, mediaType, totalPages }) {
  return (
    <SortPage
      results={movies}
      sortOptions={sortOptions}
      mediaType={mediaType}
      totalPages={totalPages}
    />
  );
}

Movies.getInitialProps = async (ctx) => {
  const { page = '1', sortBy = 'popularity.desc' } = ctx.query;
  const sortOption = getOption(sortOptions, sortBy);
  if (!sortOption) {
    redirect(ctx, '/movies');
  }
  const responseSorted = await axios.get(`${baseUrl}/api?route=${LIST_ROUTE}&mediaType=movie&sortBy=${sortOption.value}&page=${page}`);
  const { sorted, totalPages } = responseSorted.data;
  const mediaType = 'movie';
  return { movies: sorted, mediaType, totalPages: Math.min(totalPages, 10) };
};

export default Movies;
