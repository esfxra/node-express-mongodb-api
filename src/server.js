import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// import userRouter from './features/user/user.router.js';
// import taskRouter from './features/task/task.router.js';
// import categoryRouter from './features/task/category.router.js';

export default async function runServer() {
  const port = 3000;
  const app = express();

  // Set up middleware
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // Set up routes
  // app.use('/api/users', userRouter);
  // app.use('/api/tasks', taskRouter);
  // app.use('/api/categories', categoryRouter);

  if (process.env.NODE_ENV === 'test') {
    app.use('/test', (req, res) =>
      res.status(200).json({ success: 'The server is running' })
    );
  }

  // Adapt the resulting server to a promise
  return new Promise((resolve) => {
    // Start listening
    const server = app.listen(port, () =>
      console.log(`Listening on port ${port}`)
    );

    server.us;

    // Adapt the close() function to a promise
    function closeServer() {
      return new Promise((resolve) => {
        server.close(resolve);
      });
    }

    // Resolve with the server, and with a function to close it
    resolve([server, closeServer]);
  });
}
