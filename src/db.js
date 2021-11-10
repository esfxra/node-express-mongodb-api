import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { URL } from 'url';
import fs from 'fs/promises';

let dbClient = {};

async function loadData() {
  const filename = 'example-data.json';
  const dir = new URL('.', import.meta.url).pathname;
  const path = `${dir}/${filename}`;

  const data = await fs.readFile(path, { encoding: 'utf8' });
  const tasks = JSON.parse(data);

  const result = await dbClient
    .db('node-tasks-api')
    .collection('tasks')
    .insertMany(tasks);

  console.log(`Data was loaded; ${result.insertedCount} documents inserted`);
}

export async function connect() {
  // Create a local MongoDB server
  const dbServer = await MongoMemoryServer.create();
  console.log(dbServer.getUri());

  // Create a new client with the MongoDB driver
  dbClient = new MongoClient(dbServer.getUri());

  // Test connection
  await dbClient.connect();
  await dbClient.db('node-tasks-api').command({ ping: 1 });
  console.log('Connected successfully to DB server');

  // Load data
  await loadData();
}

export function getDbClient() {
  return dbClient;
}
