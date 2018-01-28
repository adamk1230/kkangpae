'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _connections = require('./connections');

var _connections2 = _interopRequireDefault(_connections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 3000;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var insertEvent = function insertEvent(tableName, obj, cb) {
  var querryString = 'INSERT INTO ?? SET ?';
  console.log(_connections2.default);
  _connections2.default.query(querryString, [tableName, obj], function (err, res) {
    if (err) throw err;
    cb(res);
  });
};

app.get('/', function (req, res) {
  console.log('Made it to get /');
  res.sendFile(_path2.default.join(__dirname, '/../index.html'));
});

app.post('/', function (req, res) {
  console.log(req.body);
  insertEvent('events', req.body, function () {
    res.redirect('/');
  });
});

app.listen(PORT, function () {
  return console.log('Server now listening on port ' + PORT + '!');
});