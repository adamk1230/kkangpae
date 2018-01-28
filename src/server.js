import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Twitter from 'twitter';
import connection from './connections';
import { twitter } from './keys';


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const insertEvent = (tableName, obj, cb) => {
  const querryString = 'INSERT INTO ?? SET ?';
  connection.query(querryString, [tableName, obj], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const postTweet = (params) => {
  const client = new Twitter({
    consumer_key: twitter.consumer_key,
    consumer_secret: twitter.consumer_secret,
    access_token_key: twitter.access_token_key,
    access_token_secret: twitter.access_token_secret,
  });

  client.post('statuses/update', params, (error, tweet, response) => {
    if (error) throw error;
    // console.log(tweet);
    // console.log(response);
  });
};

const selectID = (id) => {
  connection.query('SELECT * FROM events WHERE id =?', id, (err, res) => {
    if (err) throw err;
    console.log(res);
    let twitterSTatus = '';
    twitterSTatus = (`Title: ${res[0].title} \n Image: ${res[0].image} \n Description: ${res[0].description}`);
    console.log(twitterSTatus);
    const twitterObj = { status: twitterSTatus };

    postTweet(twitterObj);
  });
};

app.get('/', (req, res) => {
  console.log('Made it to get /');
  res.sendFile(path.join(__dirname, '/../index.html'));
});

app.post('/', (req, res) => {
  console.log(req.body);
  insertEvent('events', req.body, (results) => {
    selectID(results.insertId);

    res.redirect('/');
  });
});

app.listen(PORT, () => console.log(`Server now listening on port ${PORT}!`));
