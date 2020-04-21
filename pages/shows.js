import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Icon, Pagination } from 'semantic-ui-react';
import ContentItem from '../components/ContentItem';
import scrollToTop from '../utils/scrollToTop';
import * as S from '../components/PopularPage.style';

function Shows({ shows }) {
  const router = useRouter();

  const currentPage = router.query.page || '1';

  const handPageChange = (event, data) => {
    if (data.activePage === 1) {
      router.push('/shows').then(scrollToTop(true));
    } else {
      router.push(`/shows?page=${data.activePage}`).then(scrollToTop(true));
    }
  };

  return (
    <S.GridContainer>
      <S.FireText>
        <h2>
          <span>Popular Shows</span>
        </h2>
      </S.FireText>
      <S.ContentGrid>
        {shows.map((elem) => (
          <ContentItem
            key={elem.id}
            clientName={elem.title}
            clientUrl={`https://image.tmdb.org/t/p/w500/${elem.imageUrl}`}
          />
        ))}
      </S.ContentGrid>
      <Pagination
        defaultActivePage={currentPage}
        totalPages={7}
        onPageChange={handPageChange}
        ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
      />
    </S.GridContainer>
  );
}

Shows.getInitialProps = async (ctx) => {
  const { page = '1' } = ctx.query;
  const responseShows = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=c7aa33449f12a7ab44423f6eedd5b412&language&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50`);

  const shows = responseShows.data.results.map((e) => ({ imageUrl: e.poster_path, title: e.original_name, id: e.id }));

  return { shows };
};

export default Shows;
