import 'reflect-metadata';
import { connect, connection, set } from 'mongoose';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { app } from '../../../infra/http/app';
import { env } from '../../../utils/validators/env';

describe('Get all clients Controller', () => {
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
    const loginResponse = await request(app).post('/account/login').send({
      username: 'tester',
      password: 'tester',
    });
    authCookie = loginResponse.headers['set-cookie'][0]
      .split(';')[0]
      .split('=')[1];

    await request(app)
      .post('/client')
      .set('Cookie', `userId=${authCookie}`)
      .send({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '63496864036',
      });

    await request(app)
      .post('/client')
      .set('Cookie', `userId=${authCookie}`)
      .send({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '18365006022',
      });
  });
  afterEach(async () => {
    await connection.close();
  });

  it("Should be able to get all clients' data", async () => {
    const response = await request(app)
      .get('/client')
      .set('Cookie', `userId=${authCookie}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('phoneNumber');
    expect(response.body[0]).toHaveProperty('address');
    expect(response.body[0]).toHaveProperty('cpf');
  });

  it('Should not be able to get a client if unauthenticated', async () => {
    const response = await request(app).get(`/client`);
    expect(response.status).toBe(401);
  });
});
