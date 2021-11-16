import { connectDb, getUsersCollection, getTasksCollection } from '../db.js';
import { data, loadExampleData } from '../utils/loadExampleData.js';

describe('DB connection', () => {
  let dbServer;
  let dbClient;

  beforeAll(async () => {
    [dbServer, dbClient] = await connectDb();
  });

  afterAll(async () => {
    await dbClient.close();
    await dbServer.stop();
  });

  test('Can get the user connection', () => {
    expect(getUsersCollection()).toBeTruthy();
  });

  test('Can get the task connection', () => {
    expect(getTasksCollection()).toBeTruthy();
  });

  test('Test data is inserted', async () => {
    await loadExampleData();

    const userCount = await getUsersCollection().find().count();
    expect(userCount).toBe(data.users.length);

    const taskCount = await getTasksCollection().find().count();
    expect(taskCount).toBe(data.tasks.length);
  });
});
