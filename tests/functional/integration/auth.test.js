const request = require('supertest');
const app = require('../../../src/routes/app');

describe('POST /api/v1/login', () => {
  it('should return a token for valid login', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return 401 for invalid login', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({ email: 'wrong@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
  });
});