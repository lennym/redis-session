const { Router } = require('express');

const redis = require('redis');
const session = require('express-session');
const connectRedis = require('connect-redis');
const cookieParser = require('cookie-parser');

const defaults = require('./defaults');
const encryption = require('./encryption');

module.exports = settings => {

  if (!settings.secret) {
    throw new Error(`A session secret is required`);
  }

  const options = Object.assign(defaults, settings);

  const router = Router();

  const RedisStore = connectRedis(session);
  const client = redis.createClient({
    host: options.host,
    port: options.port
  });

  if (options.logger) {
    client.on('connect', () => options.logger('debug', `connected to redis: ${client.address}`));
    client.on('end', () => options.logger('debug', 'redis disconnected'));
    client.on('error', e => options.logger('debug', 'redis error', e));
  }

  const { encrypt, decrypt } = encryption(options.secret);
  const store = new RedisStore({
    client,
    ttl: options.ttl,
    secret: options.secret,
    serializer: {
      parse: decrypt,
      stringify: encrypt
    }
  });

  router.use(cookieParser(options.secret, {
    path: options.path,
    httpOnly: true,
    secure: options.secure
  }));

  router.use(session({
    store,
    name: options.name,
    cookie: options.secure,
    secret: options.secret,
    saveUninitialized: true,
    resave: true
  }));

  return router;
};
