'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _connections = require('./connections');

var _connections2 = _interopRequireDefault(_connections);

var _keys = require('./keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 3000;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var postTweet = function postTweet(params) {
  var client = new _twitter2.default({
    consumer_key: _keys.twitter.consumer_key,
    consumer_secret: _keys.twitter.consumer_secret,
    access_token_key: _keys.twitter.access_token_key,
    access_token_secret: _keys.twitter.access_token_secret
  });

  client.post('statuses/update', params, function (error, tweet, response) {
    if (error) throw error;
    // console.log(tweet);
    // console.log(response);
  });
};

// let lastPost;
var getNewPosts = function getNewPosts() {
  _connections2.default.query('SELECT * FROM events WHERE posted = 0', function (err, response) {
    console.log(response);
    // if (err) throw err;
    response.forEach(function (post) {
      console.log(post);
      var twitterSTatus = '';
      twitterSTatus = 'Title: ' + post.title + ' \n Image: ' + post.image + ' \n Description: ' + post.description;
      var twitterObj = { status: twitterSTatus };

      postTweet(twitterObj);
      var whatToUpdate = { posted: 1 };
      var whereToUpdate = { id: post.id };
      var queryString = 'UPDATE events SET ? WHERE ?';
      _connections2.default.query(queryString, [whatToUpdate, whereToUpdate], function (error) {
        if (error) throw error;
      });
    });
  });
};

var intervalId = void 0;
var run = function run() {
  clearInterval(intervalId);
  intervalId = setInterval(getNewPosts, 30000);
};

run();

var insertEvent = function insertEvent(tableName, obj, cb) {
  var querryString = 'INSERT INTO ?? SET ?';
  _connections2.default.query(querryString, [tableName, obj], function (err, res) {
    if (err) throw err;
    cb(res);
  });
};

// const selectID = (id) => {
//   connection.query('SELECT * FROM events WHERE id =?', id, (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     let twitterSTatus = '';
//     twitterSTatus = (`Title: ${res[0].title} \n Image: ${res[0].image} \n Description: ${res[0].description}`);
//     console.log(twitterSTatus);
//     const twitterObj = { status: twitterSTatus };

//     postTweet(twitterObj);
//   });
// };

// const newPosts = (id) => {
//   connection.query('SELECT * FROM events WHERE id >?', id, (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     return (res);
//   });
// };


// const newPosts = (id) => {
//   return new Promise((resolve, reject) => {
//     resolve(connection.query('SELECT * FROM events WHERE id >?', id, (err, res) => {
//       if (err) throw err;
//       return res;
//     }));
//   });
//   }

app.get('/', function (req, res) {
  console.log('Made it to get /');
  res.sendFile(_path2.default.join(__dirname, '/../index.html'));
});

app.post('/', function (req, res) {
  console.log(req.body);
  insertEvent('events', req.body, function (results) {
    // selectID(results.insertId);

    res.redirect('/');
  });
});

app.get('/last5', function (req, res) {

  _connections2.default.query('SELECT * FROM events WHERE posted = 0', function (err, response) {
    if (err) throw err;
    res.json(response);
  });
});

app.listen(PORT, function () {
  return console.log('Server now listening on port ' + PORT + '!');
});