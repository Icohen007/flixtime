import axios from 'axios';
import SortPage, { getOption } from '../components/SortPage';
import baseUrl from '../utils/baseUrl';
import { LIST_ROUTE } from './api/routes';
import redirect from '../utils/redirect';

export const sortOptions = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Release date', value: 'primary_release_date.desc' },
  { label: 'Rating', value: 'vote_average.desc' },
];

function Shows({
  shows, mediaType, totalPages, genresOptions,
}) {
  return (
    <SortPage
      results={shows}
      sortOptions={sortOptions}
      mediaType={mediaType}
      totalPages={totalPages}
      genresOptions={genresOptions}
    />
  );
}

Shows.getInitialProps = async (ctx) => {
  const { page = '1', sortBy = 'popularity.desc', genre = '' } = ctx.query;
  const sortOption = getOption(sortOptions, sortBy);
  if (!sortOption) {
    redirect(ctx, '/shows');
  }
  const responseSorted = await axios.get(`${baseUrl}/api?route=${LIST_ROUTE}&mediaType=tv&sortBy=${sortOption.value}${genre ? `&genre=${genre}` : ''}&page=${page}`);
  const { sorted, genresOptions, totalPages } = responseSorted.data;
  if (!sorted.length) {
    redirect(ctx, '/movies');
  }
  const mediaType = 'show';
  return {
    shows: sorted, mediaType, totalPages: Math.min(totalPages, 10), genresOptions,
  };
};

export default Shows;
