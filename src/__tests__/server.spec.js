import { jest } from '@jest/globals';
import request from 'supertest';

import runServer from '../server.js';

describe('Server connection', () => {
  let server;
  let closeServer;

  test('The server starts listening for connections', async () => {
    [server, closeServer] = await runServer();

    expect(server.listening).toBeTruthy();
  });

  test('The server responds at the test endpoint', async () => {
    request(server)
      .get('/test')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        res.body.success = 'The server is running';
      });
  });

  test('The server can be closed with the returned function', async () => {
    const closeSpy = jest.spyOn(server, 'close');
    await closeServer();

    expect(closeSpy).toHaveBeenCalled();
    expect(server.listening).toBeFalsy();
  });
});
