# redis-session
A redis-backed session store for express

`redis-session` simplifies the setting up of a redis backed session store for express.

## Usage

```
const app = express();
const session = require('@lennym/redis-session');
app.use(session({ secret: 'a better secret than this' }));
```

## Options

* `secret` - String -  *Required* - used to sign cookies and encrypt data in redis. Should be a high-entropy string
* `host` - String - hostname of your redis instance - default `localhost`
* `port` - Number - port of your redis instance - default `6379`
* `ttl` - Number - expiry time of your session in seconds - default `null`
* `name` - String - the name of the session cookie - default `sid`
* `path` - String - the path of the session cookie - default `/`
* `secure` - Boolean - if set to true will only transmit session cookies over https connections - default `process.env.NODE_ENV === 'production'`
