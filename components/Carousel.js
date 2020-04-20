import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ClientItem from './ClientItem';

function Carousel({ movies }) {
  const settings = {
    dots: true,
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
      {movies.map((movie) => (
        <ClientItem
          key={movie.id}
          clientName={movie.title}
          clientUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
      ))}
    </Slider>
  );
}


export default Carousel;
// const moviesObject = _.pick(response2.data, ['backdrop_path, title']);
