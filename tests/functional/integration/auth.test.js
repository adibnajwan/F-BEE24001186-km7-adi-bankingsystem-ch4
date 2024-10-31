const request = require('supertest');
const app = require('../../../src/app');

describe('POST /api/v1/auth/login', () => { 
  it('should return a token for valid login', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login') 
      .send({ email: 'adib@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return 401 for invalid login', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login') 
      .send({ email: "adibnajwan@gmail.com"});

    expect(response.status).toBe(401);
  });
});