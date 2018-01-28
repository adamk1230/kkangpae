import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: process.env.mySQL_PW,
  database: 'events_db',
});

connection.connect((err) => {
  if (err) {
    console.error(`error connecting:  ${err.stack}`);
  }
  console.log(`connected as id ${connection.threadId}.`);
});

export default connection;
