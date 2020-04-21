import Slider from 'react-slick';
import ContentItem from './ContentItem';

function Carousel({ content }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 500,
    // autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      }],
  };
  return (
    <Slider {...settings}>
      {content.map((elem) => (
        <ContentItem
          key={elem.id}
          clientName={elem.title}
          clientUrl={`https://image.tmdb.org/t/p/w500/${elem.imageUrl}`}
        />
      ))}
    </Slider>
  );
}


export default Carousel;
// const moviesObject = _.pick(response2.data, ['backdrop_path, title']);
