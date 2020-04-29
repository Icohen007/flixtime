import nextConnect from 'next-connect';
import { getAll, getDetails, getPopular } from '../../utils/fetchData';
import { ALL_ROUTE, DETAILS_ROUTE, POPULAR_ROUTE } from './routes';
import cacheApi, { redisClient } from './middlewares/cacheApi';

function onError(err, req, res) {
  console.log(err);
  res.status(500).end(err.toString());
}

const handler = nextConnect({ onError });
handler.use(cacheApi());
let response;

handler.get(async (req, res) => {
  const { url: key } = req;
  const {
    id, mediaType, page, route,
  } = req.query;

  switch (route) {
    case ALL_ROUTE:
      response = await getAll();
      break;
    case DETAILS_ROUTE:
      response = await getDetails(id, mediaType);
      break;
    case POPULAR_ROUTE:
      response = await getPopular(page, mediaType);
      break;
    default:
      res.status(405).send(`Route ${route} not exist`);
      return;
  }
  console.log(`cache miss at ${key}, setting data`);
  redisClient.setex(key, 3600, JSON.stringify(response));
  // res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).json(response);
});

export default handler;
