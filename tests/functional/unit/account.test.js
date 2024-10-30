const request = require('supertest');
const app = require('../../../index'); 

describe('User API', () => {
  it('should retrieve all users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Test User', email: 'testuser@example.com' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});