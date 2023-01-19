import 'reflect-metadata';
import { connect, connection, set } from 'mongoose';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { app } from '../../../infra/http/app';
import { env } from '../../../utils/validators/env';

describe('Create client Controller', () => {
  let authCookie: string;

  beforeEach(async () => {
    set('strictQuery', true);
    await connect(env.MONGO_TEST_URI || '');
    const collections = await connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    await request(app).post('/account/signup').send({
      username: 'tester',
      password: 'tester',
    });
    const response = await request(app).post('/account/login').send({
      username: 'tester',
      password: 'tester',
    });
    authCookie = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
  });
  afterEach(async () => {
    await connection.close();
  });

  it('Should be able to create a new client', async () => {
    const response = await request(app)
      .post('/client')
      .set('Cookie', `userId=${authCookie}`)
      .send({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '63496864036',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('Should be not able to create a new client with an invalid CPF', async () => {
    const response = await request(app)
      .post('/client')
      .set('Cookie', `userId=${authCookie}`)
      .send({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '12345678910',
      });
    expect(response.status).toBe(400);
  });

  it('Should be not able to create a new client without a name', async () => {
    const response = await request(app)
      .post('/client')
      .set('Cookie', `userId=${authCookie}`)
      .send({
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '63496864036',
      });
    expect(response.status).toBe(400);
  });

  it('Should be not able to create a new client without an email', async () => {
    const response = await request(app)
      .post('/client')
      .set('Cookie', `userId=${authCookie}`)
      .send({
        name: faker.name.fullName(),
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '63496864036',
      });
    expect(response.status).toBe(400);
  });

  it('Should not be able to create a client if unauthenticated', async () => {
    const response = await request(app)
      .post('/client')
      .send({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '63496864036',
      });
    expect(response.status).toBe(401);
  });
});
