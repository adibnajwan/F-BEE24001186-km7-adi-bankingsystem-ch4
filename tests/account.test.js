const request = require('supertest');
const app = require('../index'); 

describe('User API', () => {
  beforeAll(async () => {
    await request(app).post('/api/v1/users').send({
      name: 'Adib',
      email: 'adibnajwan@example.com'
    });
  });

  it('should retrieve all users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new account', async () => {
    const res = await request(app)
      .post('/api/v1/accounts')
      .send({
        userId: 45, 
        accountNumber: '123456789',
        balance: 1000.00 
      });
  
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should retrieve all accounts', async () => {
    const res = await request(app).get('/api/v1/accounts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});