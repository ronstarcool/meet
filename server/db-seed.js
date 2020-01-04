// import { client } from './index.js';
// const indexJs = require('./index.js');
const { client } = require('./index.js');


// const { client } = indexJs;

client.connect();

async function start() {
  await client.query(`CREATE TABLE users(
        id INT PRIMARY KEY NOT NULL,
        interest char(40) NOT NULL
    )`);

  client.end();
}

start();
