import SortPage, { getOption } from '../components/Shared/SortPage/SortPage';
import { getList } from '../utils/fetchData';
import ServiceUnavailable from '../components/_App/ServiceUnavailable';
import unavailableProps from '../utils/serverResponse';

export const sortOptions = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Release date', value: 'primary_release_date.desc' },
  { label: 'Rating', value: 'vote_average.desc' },
  { label: 'Revenue', value: 'revenue.desc' },
];

function Movies({
  movies, mediaType, totalPages, genresOptions, tmdbUnavailable,
}) {
  if (tmdbUnavailable) return <ServiceUnavailable />;

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

export async function getServerSideProps(ctx) {
  const { page = '1', sortBy = 'popularity.desc', genre = '' } = ctx.query;
  const mediaType = 'movie';
  const sortOption = getOption(sortOptions, sortBy);
  if (!sortOption) {
    return { redirect: { destination: '/movies', permanent: false } };
  }

  let responseSorted;
  try {
    responseSorted = await getList(page, sortBy, genre, mediaType);
  } catch (error) {
    return unavailableProps(ctx);
  }

  const { sorted, genresOptions, totalPages } = responseSorted;
  return {
    props: {
      movies: sorted, mediaType, totalPages: Math.min(totalPages, 10), genresOptions,
    },
  };
}

export default Movies;
