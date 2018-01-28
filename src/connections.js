import mysql from 'mysql';
import { mysqlPW } from './keys';

const connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: mysqlPW.pw,
  database: 'events_db',
});

connection.connect((err) => {
  if (err) {
    console.error(`error connecting:  ${err.stack}`);
  }
  console.log(`connected as id ${connection.threadId}.`);
});

export default connection;
