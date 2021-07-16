import * as redisStore from 'cache-manager-redis-store';

module.exports = {
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
