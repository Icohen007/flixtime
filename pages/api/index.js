import nextConnect from 'next-connect';
import { ALL_ROUTE, DETAILS_ROUTE } from './routes';
import { getAll, getDetails } from '../../utils/fetchData';

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
    case DETAILS_ROUTE:
      const { id, mediaType } = req.query;
      const responseDetails = await getDetails(id, mediaType);
      res.status(200).json(responseDetails);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
});

export default handler;
