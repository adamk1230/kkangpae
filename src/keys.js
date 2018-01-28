import dotenv from 'dotenv';

dotenv.config();

const twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const mysqlPW = {
  pw: process.env.MYSQL_PW,
};

export { twitter, mysqlPW };

