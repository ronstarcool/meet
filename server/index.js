require('dotenv').config();

const { Client } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

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

// io.on('connection', (socket) => {
//   console.log('someone connected');

//   socket.emit('stuff1', { hello: 'world' });

//   setInterval(() => {
//     socket.emit('stuff1', { hello: 'world' });
//   }, 2000);

//   socket.on('stuff', (data) => {
//     console.log('=== data: ', data);
//   });
// });
//= =================== https://www.youtube.com/watch?v=0B8TaM752KA
// how to connect see link above. dont do it in post route. but connect from client.
io.on('connection', async (socket) => {
  console.log('in io.on');

  socket.on('message', ({ room, message }) => {
    console.log('room', room);
    console.log('message', message);

    socket.to(room).emit('message', {
      message,
      name: 'one',
    });
  });

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

    // if (OptionalMatch.rows.length > 0) {
    if (req.body.stuff1) {
      console.log('in if');
      // no insert, give room-id to "joining user"
      console.log('dear user, we should set up a socket. and soon, we will!');
      // use room-id from db / existing user ===================================

      res.json({ message: 'found a match' }); // pass room-id
    } else {
      console.log('in else');
      // no match was found, lets insert this user into the db
      // generate room-id, and pass back, so user knows where to subscribe to

      console.log('no match was found, we will add you to the users db');
      const result = await query('insert into users values($1, $2, $3, $4)', queryArray); // add socket-id
      console.log(result);
      res.json({ message: 'inserted' });
    }
  });
});

const port = process.env.APIPORT || 4000;

server.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = { client };
