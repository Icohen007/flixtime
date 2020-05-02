import dynamic from 'next/dynamic';
import ContentItem from './ContentItem';
import { getYear } from '../utils/formatUtils';
import {useEffect, useState} from "react";

function Carousel({ content, mediaType }) {
  const [isServer, setServerState] = useState(true);
  const Slider = dynamic(import('react-slick'), {ssr: isServer});
  useEffect(() => setServerState(false), []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 3,
    speed: 500,
    autoplay: false,
    touchThreshold: 15,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                infinite: false,
                variableWidth: false,
                slidesToShow: 5,
                slidesToScroll: 2,
            }
        },

        {
            breakpoint: 700,
            settings: {
                arrows: false,
                infinite: false,
                variableWidth: false,
                slidesToShow: 4,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                variableWidth: false,
                arrows: false,
                infinite: false,
            },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {content.map((elem) => (
        <ContentItem
          key={elem.id}
          id={elem.id}
          clientName={elem.title}
          releaseDate={getYear(elem.releaseDate)}
          mediaType={mediaType}
          clientUrl={`https://image.tmdb.org/t/p/w300/${elem.imageUrl}`}
        />
      ))}
    </Slider>
  );
}

export default Carousel;
// const moviesObject = _.pick(response2.data, ['backdrop_path, title']);
