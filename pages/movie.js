import axios from 'axios';
import styled from 'styled-components';
import { Embed, Icon } from 'semantic-ui-react';
import getParsedDate from '../utils/date';

const Cover = styled.div`
background: linear-gradient(90deg, rgb(13, 13, 13), rgba(255, 255, 255, 0.05)), url(${(props) => `https://image.tmdb.org/t/p/original${props.imageUrl}`}) no-repeat top center / cover;
width: 70%;
//max-height: 60vh;
height: 70vh;
position: absolute;
top: 0;
right: 0;
z-index: -1;
`;

const MovieDetalis = styled.div`
display: flex;
flex-direction: column;
`;

const MovieContainer = styled.div`
max-width: 1400rem;
width: 100%;
padding: 20rem 0 0 20rem;
margin: 50rem auto;
color: #fff;

@media only screen and (max-width: 1150px) {
max-width: 800rem;
padding: 0 20rem;
}
`;

const MovieHeader = styled.header`
    padding-top: 50rem;
    padding-left: 70rem;
    max-width: 900rem;
    color: #fff;
`;

const MovieTitle = styled.span`
    font-weight: 700;
    font-size: 35rem;
    line-height: 1.1;
`;

const Chip = styled.div`
    border-radius: 10rem;
    font-size: 15rem;
    display: inline-block;
    line-height: 1;
    vertical-align: baseline;
    background-color: rgb(26, 26, 26);
    padding: 0.4em 0.6em;
    color: gray;
    font-weight: 400;
    &:not(:last-child){
    margin-right: 12rem;
    }
`;

const GenresContainer = styled.div`
display: flex;
justify-content: flex-start;
margin-top: 10rem;
`;

const Star = styled(Chip)`
    border-radius: 15rem;
    margin-left: 12rem;
    color: ${(props) => props.color};
    .star.icon {
    color: ${(props) => props.color};
    font-size: 12rem;
    }
`;

const MovieProperties = styled.div`
    max-width: 300rem;
    margin-top: 20rem;
`;

const PropertyContainer = styled.div`
margin-bottom: 10rem;
font-size: 20rem;
span {
font-size: 15rem;
color: gray;
margin-left: 14rem;
}

`;

const HeaderContainer = styled.div`
height: 70vh;
display: flex;
align-items: center;
position: relative;
`;


const CrewContainer = styled.div`
    padding-top: 10px;
    margin-bottom: 10px;
    max-width: 110px;
    justify-self: center;
`;

const CrewImageContainer = styled.div`
overflow: hidden;
    max-height: 110px;
    max-width: 110px;
    border-radius: 50%;
`;

const CrewImage = styled.img`
    width: 110px;
    height: 110px;
    object-fit: cover;
    ${(props) => props.imageDefined && 'object-position: 0px -14.5px;'}
`;

const CrewText = styled.div`
    margin-top: 9px;
    font-weight: 500;
    font-size: 13px;
    opacity: .85;
    color: #bdbdbd;
`;

const CrewTitle = styled.div`
font-size: 16rem;
`;

const CrewsContainer = styled.div`
margin-bottom: 20rem;
text-align: center;
max-width: 420rem;

@media only screen and (max-width: 1150px) {
max-width: 800rem;
margin: 0 auto;
}

@media only screen and (max-width: 768px) {
max-width: 420rem;
margin: 0 auto;
}


h4 {
font-size: 20rem;
}
`;

const CrewList = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
grid-column-gap: 12px;
`;

const MainContainer = styled.div`
display: grid;
grid-template-columns: auto 450rem;
grid-column-gap: 70rem;
justify-content: space-between;
@media only screen and (max-width: 1150px) {
grid-template-columns: auto;
}
`;

const Overview = styled.div`
text-align: center;

div {
color: gray;
margin-top: 20rem;
}

h4 {
color: white;
font-size: 20rem;
}
`;


const NOT_DEFINED_GENDER = 0;
const FEMALE_GENDER = 1;
const MALE_GENDER = 2;

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

function getStarColor(rating) {
  if (rating < 5) {
    return '#f44336';
  }
  if (rating < 8) {
    return '#009fb9';
  }

  return '#0fbd0fde';
}

function getDirectors(cast) {
  const directores = cast.crew.filter((e) => e.job === 'Director');
  return directores.slice(0, 2);
}

function getProducers(cast) {
  const producers = cast.crew.filter((e) => e.job === 'Producer');
  return producers.slice(0, 2);
}

function getWriters(cast) {
  const writers = cast.crew.filter((e) => e.job === 'Writer');
  return writers.slice(0, 2);
}

function getActors(cast) {
  return cast.cast.slice(0, 6);
}

function getTrailer(traliers) {
  const trailer = traliers.find((trailer) => trailer.site && trailer.site.toLowerCase() === 'youtube');
  return trailer ? trailer.key : null;
}

function Crew({
  title, imageUrl, text, gender,
}) {
  let crewImage = `https://image.tmdb.org/t/p/w300_and_h450_face${imageUrl}`;
  if (!imageUrl) {
    if (gender === NOT_DEFINED_GENDER || gender === MALE_GENDER) {
      crewImage = '/man-placeholder.jpg';
    } else if (gender === FEMALE_GENDER) {
      crewImage = '/woman-placeholder.jpg';
    }
  }

  return (
    <CrewContainer>
      <CrewTitle>{title}</CrewTitle>
      <CrewImageContainer>
        <CrewImage src={crewImage} imageDefined={!!imageUrl} />
      </CrewImageContainer>
      <CrewText>{text}</CrewText>
    </CrewContainer>
  );
}

function SemanticUiEmbedded({ trailerId }) {
  return (
    <div className="ui active embed" style={{ borderRadius: 10 }}>
      <div className="embed">
        <iframe
          frameBorder="0"
          height="100%"
          scrolling="no"
          src={`//www.youtube.com/embed/${trailerId}?autohide=true&amp;amp&amp;amp;color=%23444444&amp;amp;hq=true&amp;amp;jsapi=false&amp;amp;modestbranding=false&amp;amp;rel=1`}
          title="Embedded content from youtube."
          width="100%"
        />
      </div>
    </div>
  );
}

function Movie({ movie, cast, trailers }) {
  console.log(movie);

  const trailerId = getTrailer(trailers);
  return (
    <>
      <HeaderContainer>
        <MovieHeader>
          <MovieTitle>
            {movie.original_title}
            {movie.vote_average !== 0 && (
            <Star color={getStarColor(movie.vote_average)}>
              <Icon name="star" />
              {' '}
              {movie.vote_average}
            </Star>
            )}
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
            {movie.budget !== 0 && (
            <PropertyContainer>
              Bugdet
              <span>{`${numberWithCommas(movie.budget)} $`}</span>
            </PropertyContainer>
            )}
            {movie.revenue !== 0 && (
            <PropertyContainer>
              Revenue
              <span>{`${numberWithCommas(movie.revenue)} $`}</span>
            </PropertyContainer>
            )}
          </MovieProperties>
        </MovieHeader>
        <Cover imageUrl={movie.backdrop_path} />
      </HeaderContainer>
      <MovieContainer>
        <MainContainer>
          <Overview>
            <h4>Overview</h4>
            <div>{movie.overview}</div>
            {trailerId && <SemanticUiEmbedded trailerId={trailerId} />}
          </Overview>
          <div>
            <CrewsContainer>
              <h4> Crew </h4>
              <CrewList>
                {getDirectors(cast).map((crew) => (
                  <Crew
                    key={crew.credit_id}
                    title="Director"
                    imageUrl={crew.profile_path}
                    text={crew.name}
                    gender={crew.gender}
                  />
                ))}
                {getProducers(cast).map((crew) => (
                  <Crew
                    key={crew.credit_id}
                    title="Producer"
                    imageUrl={crew.profile_path}
                    text={crew.name}
                    gender={crew.gender}
                  />
                ))}
                {getWriters(cast).map((crew) => (
                  <Crew
                    key={crew.credit_id}
                    title="Writer"
                    imageUrl={crew.profile_path}
                    text={crew.name}
                    gender={crew.gender}
                  />
                ))}
              </CrewList>
            </CrewsContainer>
            <CrewsContainer>
              <h4> Cast </h4>
              <CrewList>
                {getActors(cast).map((crew) => (
                  <Crew
                    key={crew.credit_id}
                    title="Actor"
                    imageUrl={crew.profile_path}
                    text={`${crew.name} - ${crew.character}`}
                    gender={crew.gender}
                  />
                ))}
              </CrewList>
            </CrewsContainer>
          </div>
        </MainContainer>
      </MovieContainer>
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


  const movieTrailer = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`);

  return { movie: responseMovie.data, cast: movieCast.data, trailers: movieTrailer.data.results };
};

export default Movie;
