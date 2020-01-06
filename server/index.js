require('dotenv').config();

const { Client } = require('pg');
const express = require('express');
const cors = require('cors');
const uuid = require('uuid');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('message', (data) => {
    socket.to(data.roomId).emit('message', data);
  });
});

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

  console.log('==========');
  console.log(OptionalMatch.rows);

  if (OptionalMatch.rows.length > 0) {
  // if (req.body.stuff1) { // a match was found, give roomId to joining user
    console.log('in if: dear user, we should set up a socket.');

    res.json({
      message: 'found a match',
      roomId: OptionalMatch.rows[0].roomid,
    }); // pass room-id
  } else { // no match was found, insert this user into the db
    console.log('in else: no match was found, we will add you to the users db');
    const roomId = uuid();

    const result = await query('insert into users values($1, $2, $3, $4, $5)', [...queryArray, roomId]);
    console.log('inserted: ', result);
    res.json({
      message: 'inserted',
      roomId,
    });
  }
});

const port = process.env.APIPORT || 4000;

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
