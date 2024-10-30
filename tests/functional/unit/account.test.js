const request = require('supertest');
const app = require('../index'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Account API', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });