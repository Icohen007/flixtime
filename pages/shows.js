import SortPage, { getOption } from '../components/Shared/SortPage/SortPage';
import { getList } from '../utils/fetchData';
import ServiceUnavailable from '../components/_App/ServiceUnavailable';
import unavailableProps from '../utils/serverResponse';

export const sortOptions = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Release date', value: 'first_air_date.desc' },
  { label: 'Rating', value: 'vote_average.desc' },
];

function Shows({
  shows, mediaType, totalPages, genresOptions, tmdbUnavailable,
}) {
  if (tmdbUnavailable) return <ServiceUnavailable />;

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

export async function getServerSideProps(ctx) {
  const { page = '1', sortBy = 'popularity.desc', genre = '' } = ctx.query;
  const sortOption = getOption(sortOptions, sortBy);
  if (!sortOption) {
    return { redirect: { destination: '/shows', permanent: false } };
  }

  let responseSorted;
  try {
    responseSorted = await getList(page, sortBy, genre, 'tv');
  } catch (error) {
    return unavailableProps(ctx);
  }

  const { sorted, genresOptions, totalPages } = responseSorted;
  const mediaType = 'show';
  return {
    props: {
      shows: sorted, mediaType, totalPages: Math.min(totalPages, 10), genresOptions,
    },
  };
}

export default Shows;
