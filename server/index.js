require('dotenv').config();

const { Client } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DATABASE,
});

client.connect();

async function query(text, params) {
  let result;
  try {
    result = await client.query(text, params);
    console.log('this went well!');
  } catch (err) {
    console.log('oh oh, it seems we got an error');
    console.log(err);
  }
  return result;
}

app.post('/user', async (req, res) => {
  console.log('reached the backend route');
  console.log('req.body', req.body);
  const queryArray = [
    req.body.id,
    req.body.interest,
    req.body.lat,
    req.body.long,
  ];

  // see if there is a match
  // await query("select * from users where lat < 51.8978 + 0.0007");
  const OptionalMatch = await query(`select * from users where 
    lat < $1 + 0.0007
    AND lat > $1 - 0.0007
    AND long < $2 + 0.0007
    AND long > $2 - 0.0007
    AND interest = $3;`, [req.body.lat, req.body.long, req.body.interest]);
    // this stuff needs to be WAY expandid, but now only matches nearby chatters with same interest

  if (OptionalMatch.rows.length > 0) {
    // no insert, but generate a socket.io. or maybe we should insert.
    // cause if the first user leaves, the socket would be gone
    console.log('dear user, we should set up a socket. and soon, we will!');
    // use socket-id from db
    res.json({ message: 'found a match' });
  } else {
    // no match was found, lets insert this user into the db
    // generate socket-id
    console.log('no match was found, we will add you to the users db');
    const result = await query('insert into users values($1, $2, $3, $4)', queryArray); // add socket-id
    console.log(result);
    res.json({ message: 'inserted' });
  }
});

const port = process.env.APIPORT || 4000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = { client };
