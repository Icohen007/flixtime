import Slider from 'react-slick';
import ContentItem from './ContentItem';

function Carousel({ content }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 3,
    speed: 500,
    pauseOnHover: true,
    autoplay: false,
    touchThreshold: 15,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          variableWidth: true,
          arrows: false,
        },
      }],
  };
  return (
    <Slider {...settings}>
      {content.map((elem) => (
        <ContentItem
          key={elem.id}
          id={elem.id}
          clientName={elem.title}
          clientUrl={`https://image.tmdb.org/t/p/w500/${elem.imageUrl}`}
        />
      ))}
    </Slider>
  );
}


export default Carousel;
// const moviesObject = _.pick(response2.data, ['backdrop_path, title']);
