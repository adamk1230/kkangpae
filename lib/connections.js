'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _keys = require('./keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = _mysql2.default.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: _keys.mysqlPW.pw,
  database: 'events_db'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting:  ' + err.stack);
  }
  console.log('connected as id ' + connection.threadId + '.');
});

exports.default = connection;