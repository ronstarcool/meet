require('dotenv').config();

const { Client } = require('pg');
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');

const app = express();

// app.use(morgan('tiny'));
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
  } catch (err) {
    console.log(err);
  }
  return result;
}

app.post('/stuff', async (req, res) => {
  console.log('yes we are connected sir!');
  console.log(req.body);
  const queryArray = [
    req.body.id,
    req.body.interest,
    req.body.lat,
    req.body.long,
  ];
  const result = await query('insert into users values($1, $2, $3, $4)', queryArray);
  res.json({ message: result });
});

const port = process.env.APIPORT || 4000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = { client };
