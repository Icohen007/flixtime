import axios from 'axios';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import getParsedDate from '../utils/date';

const Cover = styled.div`
background: linear-gradient(90deg, rgb(13, 13, 13), rgba(255, 255, 255, 0.05)), url(${(props) => `https://image.tmdb.org/t/p/original${props.imageUrl}`}) no-repeat top center / cover;
width: 70%;
//max-height: 60vh;
height: 60vh;
margin-left: auto;
`;

const MovieDetalis = styled.div`
display: flex;
flex-direction: column;
`;

const MovieContainer = styled.div`
max-width: 1280rem;
width: 100%;
padding: 10rem 40rem 55rem;
margin: 0 auto;
color: #fff;
`;

const MovieHeader = styled.header`
    padding-top: 50rem;
    padding-left: 70rem;
    color: #fff;
`;

const MovieTitle = styled.div`
    display: flex;
    font-weight: 700;
    font-size: 35rem;
    line-height: 1.1;
    align-items: flex-end;
`;

const Chip = styled.div`
    border-radius: 10rem;
    font-size: 15rem;
    margin-right: 12rem;
    display: inline-block;
    line-height: 1;
    vertical-align: baseline;
    background-color: rgb(26, 26, 26);
    padding: 0.4em 0.6em;
    color: gray;
    font-weight: 400;
`;

const GenresContainer = styled.div`
display: flex;
justify-content: flex-start;

margin-top: 10rem;
`;

const Star = styled(Chip)`
    border-radius: 15rem;
    margin-left: 12rem;
    color: #fb8c00;
    .star.icon {
    color: #fb8c00;
    font-size: 12rem;
    }
`;

const MovieProperties = styled.div`
display: flex;
flex-direction: column;
    max-width: 300rem;
    flex-shrink: 0;
    margin-right: 65px;
`;

const PropertyContainer = styled.div`
margin-bottom: 15rem;
font-size: 20rem;
span {
font-size: 15rem;
color: gray;
margin-left: 14rem;
}

`;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatMinues(min) {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;
  if (hours > 0) {
    return `${hours}hr ${minutes}min`;
  }
  return `${minutes}min`;
}

function getDirector(cast) {
  const directors = cast.crew.filter((e) => e.job === 'Director');
  console.log({directors});
}

function Movie({ movie, cast }) {
  getDirector(cast);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MovieHeader>
          <MovieTitle>
            {movie.original_title}
            <Star>
              <Icon name="star" />
              {' '}
              {movie.vote_average}
            </Star>
          </MovieTitle>
          <GenresContainer>
            {movie.genres.slice(0, 3).map(((genre) => <Chip key={genre.id}>{genre.name}</Chip>))}
          </GenresContainer>
          <MovieProperties>
            <PropertyContainer>
              Release
              <span>{getParsedDate(movie.release_date)}</span>
            </PropertyContainer>
            <PropertyContainer>
              Run Time
              <span>{formatMinues(movie.runtime)}</span>
            </PropertyContainer>
            <PropertyContainer>
              Bugdet
              <span>{`${numberWithCommas(movie.budget)} $`}</span>
            </PropertyContainer>
            <PropertyContainer>
              Revenue
              <span>{`${numberWithCommas(movie.revenue)} $`}</span>
            </PropertyContainer>
            <PropertyContainer>
              Release
              <span>{getParsedDate(movie.release_date)}</span>
            </PropertyContainer>
          </MovieProperties>
        </MovieHeader>
        <Cover imageUrl={movie.backdrop_path} />
      </div>
      <MovieContainer />
    </>
  );
}

Movie.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const responseMovie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`);
  // const {
  //   budget, genres, homepage, original_title: originalTitle,
  //   overview, poster_path: posterPath, backdrop_path: coverPath,
  //   release_date: releaseDate, production_companies: productionCompanies,
  //   runtime, vote_average: voteAverage, tagline,
  // } = responseMovie.data;
  // // const movie = responseMovie.data.results.map((e) => ({ imageUrl: e.poster_path, title: e.original_title, id: e.id }));
  //
  // const movie = { budget , genres, homepage, originalTitle, overview, posterPath, coverPath}

  const movieGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`);

  const genresMovieMap = movieGenres.data.genres.reduce((acc, cur) => {
    acc[cur.id] = cur.name;
    return acc;
  }, {});

  const movieCast = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`);

  return { movie: responseMovie.data, cast: movieCast.data };
};

export default Movie;
