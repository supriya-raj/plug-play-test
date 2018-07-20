const assets = require('./asset-paths');

//Env based config
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const __DEV__ = env === 'development';
var envConfig = require('./env/'+env);

const secretConfig = require('./secrets');
var generalConfig = {
  COMMIT_HASH: process.env && (process.env.COMMIT_HASH || null)
};

if (__DEV__) {
  envConfig = Object.assign({}, {
    __DEV__: true
  }, envConfig);
};

module.exports = Object.assign(
  {},
  generalConfig,
  envConfig,
  secretConfig,
  assets
);
