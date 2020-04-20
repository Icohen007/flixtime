import Slider from 'react-slick';
import ClientItem from './ClientItem';

const clientsIcons = ['https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg', 'https://image.tmdb.org/t/p/w500//jQNOzoiaIQWxJAx8OUighnvnhRA.jpg'];

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 2000,
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
      {clientsIcons.map((client) => (
        <ClientItem
          key={client}
          clientName={client.split('.')[0] || client}
          clientUrl={client}
        />
      ))}
    </Slider>
  );
}
export default Carousel;
