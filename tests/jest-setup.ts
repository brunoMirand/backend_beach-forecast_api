import { SetupServer } from '@src/server';
import supertest from 'supertest';

interface props {
  testRequest: NodeJS.Global
};

beforeAll(() => {
 const server = new SetupServer();
 server.init();
 global.testRequest = supertest(server.getApp());
});
