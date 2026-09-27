import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ContentItem from '../ContentItem/ContentItem';
import { getYear } from '../../../utils/formatUtils';

function slidesForWidth(width) {
  if (width <= 480) return 2;
  if (width <= 550) return 3;
  if (width <= 920) return 4;
  if (width <= 1090) return 5;
  if (width <= 1245) return 6;
  return 7;
}

function Carousel({ content, mediaType }) {
  // react-slick only updates its responsive breakpoint after a media-query
  // change, so on mobile it otherwise keeps the desktop setting on first load.
  const [viewportWidth, setViewportWidth] = useState(null);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const slidesToShow = viewportWidth === null ? 7 : slidesForWidth(viewportWidth);
  const isMobile = viewportWidth !== null && viewportWidth <= 768;

  const settings = {
    dots: false,
    infinite: !isMobile,
    slidesToShow,
    slidesToScroll: slidesToShow === 2 ? 1 : Math.min(slidesToShow, 3),
    speed: 500,
    autoplay: false,
    touchThreshold: 15,
    arrows: !isMobile,
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
          clientUrl={elem.imageUrl ? `https://image.tmdb.org/t/p/w300/${elem.imageUrl}` : '/not_available.png'}
        />
      ))}
    </Slider>
  );
}

export default Carousel;
