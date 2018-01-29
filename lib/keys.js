'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mysqlPW = exports.twitter = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

var mysqlPW = {
  pw: process.env.MYSQL_PW
};

exports.twitter = twitter;
exports.mysqlPW = mysqlPW;