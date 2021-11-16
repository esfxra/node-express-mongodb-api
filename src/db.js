import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

let dbClient = {};

export async function connectDb() {
  // Create a local MongoDB server
  const dbServer = await MongoMemoryServer.create();

  // Create a new client with the MongoDB driver
  dbClient = new MongoClient(dbServer.getUri());

  try {
    // Connect the client
    await dbClient.connect();
    return [dbServer, dbClient];
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}

export function getDbClient() {
  return dbClient;
}

export function getUsersCollection() {
  return dbClient.db('tasks_app').collection('users');
}

export function getTasksCollection() {
  return dbClient.db('tasks_app').collection('tasks');
}
