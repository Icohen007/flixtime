import redis from 'redis';

export const redisClient = redis.createClient({ port: process.env.REDIS_PORT, host: process.env.REDIS_HOST });

redisClient.auth(process.env.REDIS_PASSWORD, (err, response) => {
  if (err) {
    throw err;
  }
  console.log({ response });
});

function cacheApi() {
  return (req, res, next) => {
    const { url: key } = req;

    redisClient.get(key, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      if (data !== null) {
        console.log(`cache hit at ${key}`);
        res.status(200).json(JSON.parse(data));
      } else {
        next();
      }
    });
  };
}

export default cacheApi;
