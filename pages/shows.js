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

function Shows({ shows, mediaType, totalPages }) {
  return (
    <SortPage
      results={shows}
      sortOptions={sortOptions}
      mediaType={mediaType}
      totalPages={totalPages}
    />
  );
}

Shows.getInitialProps = async (ctx) => {
  const { page = '1', sortBy = 'popularity.desc' } = ctx.query;
  const sortOption = getOption(sortOptions, sortBy);
  if (!sortOption) {
    redirect(ctx, '/shows');
  }
  const responseSorted = await axios.get(`${baseUrl}/api?route=${LIST_ROUTE}&mediaType=tv&sortBy=${sortOption.value}&page=${page}`);
  const { sorted, totalPages } = responseSorted.data;
  const mediaType = 'show';
  return { shows: sorted, mediaType, totalPages: Math.min(totalPages, 10) };
};

export default Shows;
