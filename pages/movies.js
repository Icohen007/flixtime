import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Icon, Pagination } from 'semantic-ui-react';
import ContentItem from '../components/ContentItem';
import scrollToTop from '../utils/scrollToTop';
import * as S from '../components/PopularPage.style';
import { getYear } from '../utils/formatUtils';
import baseUrl from '../utils/baseUrl';
import { POPULAR_ROUTE } from './api/routes';

function Movies({ movies, mediaType, totalPages }) {
  const router = useRouter();

  const currentPage = router.query.page || '1';

  const handPageChange = (event, data) => {
    if (data.activePage === 1) {
      router.push('/movies').then(scrollToTop(true));
    } else {
      router.push(`/movies?page=${data.activePage}`).then(scrollToTop(true));
    }
  };

  return (
    <S.GridContainer>
      <S.FireText>
        <h2>
          <span>Popular Movies</span>
        </h2>
      </S.FireText>
      <S.ContentGrid>
        {movies.map((elem) => (
          <ContentItem
            key={elem.id}
            id={elem.id}
            clientName={elem.title}
            mediaType={mediaType}
            runningDate={getYear(elem.releaseDate)}
            clientUrl={`https://image.tmdb.org/t/p/w300/${elem.imageUrl}`}
          />
        ))}
      </S.ContentGrid>
      <Pagination
        defaultActivePage={currentPage}
        totalPages={totalPages}
        onPageChange={handPageChange}
        siblingRange={2}
        boundaryRange={0}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
      />
    </S.GridContainer>
  );
}


Movies.getInitialProps = async (ctx) => {
  const { page = '1' } = ctx.query;
  const responsePopular = await axios.get(`${baseUrl}/api?route=${POPULAR_ROUTE}&mediaType=movie&page=${page}`);
  const { popular, totalPages } = responsePopular.data;
  const mediaType = 'movie';
  return { movies: popular, mediaType, totalPages: Math.min(totalPages, 10) };
};

export default Movies;
