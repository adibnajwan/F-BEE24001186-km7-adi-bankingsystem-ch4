const request = require('supertest');
const app = require('../../../index'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('User API', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Adib', email: 'adibnajwan@example.com', bio: 'Backend Engineer' });
  
    console.log(res.body); 
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Adib');
  });  

  it('should retrieve all users', async () => {
    const res = await request(app).get('/api/v1/users');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

    it('should retrieve a user by ID', async () => {
    const userId = 1;
    const res = await request(app).get(`/api/v1/users/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });
});