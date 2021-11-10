import express from 'express';

import { connect, getDbClient } from './db.js';

const port = 3000;
const app = express();

await connect();

app.get('/', (req, res) => {
  res.send('hello there');
});

app.get('/data', async (req, res) => {
  const dbClient = getDbClient();
  const data = await dbClient
    .db('node-tasks-api')
    .collection('tasks')
    .find()
    .toArray();

  res.send(JSON.stringify(data));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
