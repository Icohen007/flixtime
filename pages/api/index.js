import nextConnect from 'next-connect';
import { ALL_ROUTE, DETAILS_ROUTE, POPULAR_ROUTE } from './routes';
import { getAll, getDetails, getPopular } from '../../utils/fetchData';

function onError(err, req, res) {
  console.log(err);
  res.status(500).end(err.toString());
}

const handler = nextConnect({ onError });
// handler.use(authenticateAndAttachUser());


handler.get(async (req, res) => {
  const { id, mediaType, page } = req.query;
  switch (req.query.route) {
    case ALL_ROUTE:
      const responseAll = await getAll();
      res.status(200).json(responseAll);
      break;
    case DETAILS_ROUTE:
      const responseDetails = await getDetails(id, mediaType);
      res.status(200).json(responseDetails);
      break;
    case POPULAR_ROUTE:
      const responsePopular = await getPopular(page, mediaType);
      res.status(200).json(responsePopular);
      break;
    default:
      res.status(405).send(`Route ${req.query.route} not exist`);
  }
});

export default handler;
