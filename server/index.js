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
  port: process.env.PORT,
  database: process.env.DATABASE,
});

app.post('/stuff', (req, res) => {
  console.log('yes we are connected sir!');
  console.log(req.body);

  res.json({
    message: 'Behold The MEVN Stack!',
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = { client };
