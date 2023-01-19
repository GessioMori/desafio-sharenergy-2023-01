import 'reflect-metadata';
import { connect, connection, set } from 'mongoose';
import { config } from 'dotenv';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { app } from '../../../infra/http/app';

describe('Get client Controller', () => {
  let authCookie: string;
  let clientId: string;

  beforeEach(async () => {
    config();
    set('strictQuery', true);
    await connect(process.env.MONGO_TEST_URI || '');
    const collections = await connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    await request(app).post('/account/signup').send({
      username: 'tester',
      password: 'tester',
    });
    const loginResponse = await request(app).post('/account/login').send({
      username: 'tester',
      password: 'tester',
    });
    authCookie = loginResponse.headers['set-cookie'][0]
      .split(';')[0]
      .split('=')[1];

    const newClientResponse = await request(app)
      .post('/client')
      .set('Cookie', `userId=${authCookie}`)
      .send({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '63496864036',
      });

    clientId = newClientResponse.body._id;
  });
  afterEach(async () => {
    await connection.close();
  });

  it("Should be able to get a client's data", async () => {
    const response = await request(app)
      .get(`/client/${clientId}`)
      .set('Cookie', `userId=${authCookie}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('phoneNumber');
    expect(response.body).toHaveProperty('address');
    expect(response.body).toHaveProperty('cpf');
  });

  it('Should be not able to get a client with an invalid id', async () => {
    const response = await request(app)
      .get('/client/invalidId')
      .set('Cookie', `userId=${authCookie}`);
    expect(response.status).toBe(400);
  });

  it('Should not be able to get a client if unauthenticated', async () => {
    const response = await request(app).get(`/client/${clientId}`);
    expect(response.status).toBe(401);
  });
});
