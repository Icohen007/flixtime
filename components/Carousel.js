import Slider from 'react-slick';
import ContentItem from './ContentItem';
import { getYear } from '../utils/formatUtils';

function Carousel({ content, mediaType }) {
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
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
          runningDate={getYear(elem.runningDate)}
          mediaType={mediaType}
          clientUrl={`https://image.tmdb.org/t/p/w300/${elem.imageUrl}`}
        />
      ))}
    </Slider>
  );
}


export default Carousel;
// const moviesObject = _.pick(response2.data, ['backdrop_path, title']);
