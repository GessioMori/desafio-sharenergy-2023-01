import 'reflect-metadata';
import { connect, connection, set } from 'mongoose';
import request from 'supertest';
import { app } from '../../../infra/http/app';
import { env } from '../../../utils/validators/env';

describe('Create Account Controller', () => {
  beforeEach(async () => {
    set('strictQuery', true);
    await connect(env.MONGO_TEST_URI);
    const collections = await connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });
  afterEach(async () => {
    await connection.close();
  });
  it('Should be able to create a new account', async () => {
    const response = await request(app).post('/account/signup').send({
      username: 'tester',
      password: 'tester',
    });
    expect(response.status).toBe(201);
  });
  it('Should not be able to create a new account with an existing username', async () => {
    await request(app).post('/account/signup').send({
      username: 'tester',
      password: 'tester',
    });
    const response = await request(app).post('/account/signup').send({
      username: 'tester',
      password: 'tester',
    });
    expect(response.status).toBe(409);
  });
});
