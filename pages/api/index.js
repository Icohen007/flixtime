import nextConnect from 'next-connect';
import axios from 'axios';
import { ALL_ROUTE, MOVIE_ROUTE } from './routes';
import { getAll } from '../../utils/fetchData';

function onError(err, req, res) {
  console.log(err);
  res.status(500).end(err.toString());
}

const handler = nextConnect({ onError });
// handler.use(authenticateAndAttachUser());


handler.get(async (req, res) => {
  switch (req.query.route) {
    case ALL_ROUTE:
      const responseAll = await getAll();
      res.status(200).json(responseAll);
      break;
    case MOVIE_ROUTE:
      try {
        const { mediaType, id } = req.query;
        const responseDetails = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.API_KEY}&language=en-US`);
        const responseCredits = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.API_KEY}`);
        const responseTrailers = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`);
        const responseReviews = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/reviews?api_key=${process.env.API_KEY}&language=en-US&page=1`);

        res.status(200).json({
          details: responseDetails.data,
          credits: responseCredits.data,
          trailers: responseTrailers.data.results,
          reviews: responseReviews.data.results,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error getting All');
      }
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
});

export default handler;
