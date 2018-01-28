import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import connection from './connections';


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const insertEvent = (tableName, obj, cb) => {
  const querryString = 'INSERT INTO ?? SET ?';
  console.log(connection);
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
