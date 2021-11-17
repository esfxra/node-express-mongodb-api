import { connectDb } from './db';
import runServer from './server';

await connectDb();
await runServer();
