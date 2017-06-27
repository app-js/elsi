
console.log("wp ---> env: " + process.env.NODE_ENV + " (undefined = development)");
console.log("wp ---> ./webpack.config.js");

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./conf/webpack.prod')({env: 'production'});
    break;
  case 'test':
  case 'testing':
    module.exports = require('./conf/webpack.test')({env: 'test'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./conf/webpack.dev')({env: 'development'});
}
