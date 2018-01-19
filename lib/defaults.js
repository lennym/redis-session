const debug = require('debug');

module.exports = {
  path: '/',
  name: 'sid',
  secure: process.env.NODE_ENV === 'production',
  logger: debug('redis-session')
};
