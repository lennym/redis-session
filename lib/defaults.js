const debug = require('debug');

module.exports = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  logger: debug('redis-session')
};
