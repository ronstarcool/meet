require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DATABASE,
});

client.connect();

async function start() {
  await client.query(`CREATE TABLE users(
        id uuid PRIMARY KEY NOT NULL,
        interest char(40) NOT NULL,
        lat numeric,
        long numeric,
        roomId uuid
    )`);

  client.end();
}

start();
