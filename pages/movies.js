import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Icon, Pagination } from 'semantic-ui-react';
import styled from 'styled-components';
import Slider from 'react-slick';
import ContentItem from '../components/ContentItem';
import scrollToTop from '../utils/scrollToTop';

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 15px;
  grid-row-gap: 30px;
  align-items: baseline;
  justify-content: space-evenly;
  margin: 200rem auto 0;
`;

const MovieContainer = styled.div`
    flex-direction: column;
    max-width: 1150px;
    width: 100%;
   margin: auto;
   padding: 10rem;
   justify-content: center;
   text-align: center;
`;

function Movies({ movies }) {
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
    <MovieContainer>
      <MoviesGrid>
        {movies.map((elem) => (
          <ContentItem
            key={elem.id}
            clientName={elem.title}
            clientUrl={`https://image.tmdb.org/t/p/w500/${elem.imageUrl}`}
          />
        ))}
      </MoviesGrid>
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
    </MovieContainer>
  );
}

Movies.getInitialProps = async (ctx) => {
  const { page = '1' } = ctx.query;
  console.log(page);
  const resposeMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=c7aa33449f12a7ab44423f6eedd5b412&language&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50`);

  const movies = resposeMovies.data.results.map((e) => ({
    imageUrl: e.poster_path,
    title: e.original_title,
    id: e.id,
  }));

  return { movies };
};

export default Movies;
