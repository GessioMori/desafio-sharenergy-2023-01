import 'reflect-metadata';
import { connect, connection, set } from 'mongoose';
import { config } from 'dotenv';
import request from 'supertest';
import { app } from '../../../infra/http/app';

describe('Login Controller', () => {
  beforeEach(async () => {
    config();
    set('strictQuery', true);
    await connect(process.env.MONGO_TEST_URI || '');
    const collections = await connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterEach(async () => {
    await connection.close();
  });

  it('Should be able to login and receive a cookie', async () => {
    await request(app).post('/account/signup').send({
      username: 'tester',
      password: 'tester',
    });
    const response = await request(app).post('/account/login').send({
      username: 'tester',
      password: 'tester',
    });

    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();
    expect(response.headers['set-cookie'][0].split('=')[0]).toEqual('userId');
  });

  it('Should not be able to login with an invalid username', async () => {
    await request(app).post('/account/signup').send({
      username: 'tester',
      password: 'tester',
    });
    const response = await request(app).post('/account/login').send({
      username: 'invalid',
      password: 'tester',
    });

    expect(response.status).toBe(401);
  });

  it('Should not be able to login with an invalid password', async () => {
    await request(app).post('/account/signup').send({
      username: 'tester',
      password: 'tester',
    });
    const response = await request(app).post('/account/login').send({
      username: 'tester',
      password: 'invalid',
    });

    expect(response.status).toBe(401);
  });
});
