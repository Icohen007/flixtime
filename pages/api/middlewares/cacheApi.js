import redis from 'redis';

const redisClient = redis.createClient({ port: process.env.REDIS_PORT, host: process.env.REDIS_HOST });

export const redisSet = (key, data) => redisClient.setex(key, 3600, JSON.stringify(data));

export const redisStatus = { isOk: false };

if (!redisStatus.isOk) {
  redisClient.auth(process.env.REDIS_PASSWORD, (err, response) => {
    if (err) {
      redisStatus.isOk = false;
      return;
    }
    console.log({ response });
    redisStatus.isOk = true;
  });
}

function cacheApi() {
  return (req, res, next) => {
    const { url: key } = req;

    redisClient.get(key, (err, data) => {
      if (err) {
        console.log(err);
        redisStatus.isOk = false;
        next();
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
