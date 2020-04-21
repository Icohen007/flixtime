import Slider from 'react-slick';
import Header from './Header';

function CarouselTrending({ content }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
  };
  return (
    <Slider {...settings}>
      {content.map((elem) => (
        <Header
          key={elem.id}
          imageUrl={elem.imageUrl}
          title={elem.title}
          releaseDate={elem.releaseDate}
        />
      ))}
    </Slider>
  );
}


export default CarouselTrending;
// const moviesObject = _.pick(response2.data, ['backdrop_path, title']);
