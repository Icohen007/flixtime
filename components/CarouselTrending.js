import Slider from 'react-slick';
import Header from './Header';

function CarouselTrending({ content, genresMovieMap }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 700,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
  };
  return (
    <Slider {...settings}>
      {content.slice(0, 10).map((elem) => (
        <Header
          key={elem.id}
          id={elem.id}
          genreIds={elem.genreIds}
          genresMovieMap={genresMovieMap}
          imageUrl={elem.coverImageUrl}
          title={elem.title}
          runningDate={elem.runningDate}
        />
      ))}
    </Slider>
  );
}


export default CarouselTrending;
// const moviesObject = _.pick(response2.data, ['backdrop_path, title']);
