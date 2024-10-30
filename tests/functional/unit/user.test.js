const request = require('supertest');
const app = require('../index'); // Assuming index.js is your entry point
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('User API', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });
});