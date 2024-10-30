const request = require('supertest');
const app = require('../index'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Account API', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });
  
  it('should create a new account', async () => {
    const res = await request(app)
      .post('/api/v1/accounts')
      .send({ userId: 1, accountNumber: '123456789', balance: 1000.0 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});