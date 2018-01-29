import 'babel-polyfill';
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

// post tweets to twitter.
const postTweet = (params) => {
  const client = new Twitter({
    consumer_key: twitter.consumer_key,
    consumer_secret: twitter.consumer_secret,
    access_token_key: twitter.access_token_key,
    access_token_secret: twitter.access_token_secret,
  });

  client.post('statuses/update', params, (error) => {
    if (error) throw error;
  });
};


// grabs all posts that haven't been posted and posts them.
const getNewPosts = () => {
  connection.query('SELECT * FROM events WHERE posted = 0', (err, response) => {
    console.log(response);
    // if (err) throw err;
    response.forEach((post) => {
      console.log(post);
      let twitterSTatus = '';
      twitterSTatus = (`Title: ${post.title} \n Image: ${post.image} \n Description: ${post.description}`);
      const twitterObj = { status: twitterSTatus };

      postTweet(twitterObj);
      const whatToUpdate = { posted: 1 };
      const whereToUpdate = { id: post.id };
      const queryString = 'UPDATE events SET ? WHERE ?';
      connection.query(queryString, [whatToUpdate, whereToUpdate], (error) => {
        if (error) throw error;
      });
    });
  });
};


let intervalId;
// calls getNewPosts every 5 minutes to check and post new content.
const run = () => {
  clearInterval(intervalId);
  intervalId = setInterval(getNewPosts, 300000);
};

run();


const insertEvent = (tableName, obj, cb) => {
  const querryString = 'INSERT INTO ?? SET ?';
  connection.query(querryString, [tableName, obj], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};


app.get('/', (req, res) => {
  console.log('Made it to get /');
  res.sendFile(path.join(__dirname, '/../index.html'));
});

app.post('/', (req, res) => {
  console.log(req.body);
  insertEvent('events', req.body, () => {
    res.redirect('/');
  });
});


app.listen(PORT, () => console.log(`Server now listening on port ${PORT}!`));
