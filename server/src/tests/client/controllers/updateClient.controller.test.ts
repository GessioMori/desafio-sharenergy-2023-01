import 'reflect-metadata';
import { connect, connection, set } from 'mongoose';
import { config } from 'dotenv';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { app } from '../../../infra/http/app';

describe('Update client Controller', () => {
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

  it('Should be able to update a client', async () => {
    const updatedData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('###########'),
      address: faker.address.streetAddress(),
    };
    const response = await request(app)
      .put(`/client/${clientId}`)
      .set('Cookie', `userId=${authCookie}`)
      .send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(updatedData.name);
    expect(response.body.email).toEqual(updatedData.email);
    expect(response.body.phoneNumber).toEqual(updatedData.phoneNumber);
    expect(response.body.address).toEqual(updatedData.address);
    expect(response.body._id).toEqual(clientId);
  });

  it("Should not be able to update client's CPF", async () => {
    const updatedData = {
      cpf: '27134610063',
    };
    const response = await request(app)
      .put(`/client/${clientId}`)
      .set('Cookie', `userId=${authCookie}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.cpf).not.toEqual(updatedData.cpf);
  });

  it('Should not be able to update a client if unauthenticated', async () => {
    const updatedData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('###########'),
      address: faker.address.streetAddress(),
    };
    const response = await request(app)
      .put(`/client/${clientId}`)
      .send(updatedData);
    expect(response.status).toBe(401);
  });
});
