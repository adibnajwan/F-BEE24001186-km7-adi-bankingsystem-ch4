const transactionController = require('../../../src/controllers/transactionController');
const transactionService = require('../../../src/services/transactionService');
const { validateTransaction } = require('../../../src/validations/transactionValidation');
const { validationResult } = require('express-validator');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

const mockRequest = (body, params = {}) => ({
  body,
  params,
});

module.exports = { mockResponse, mockRequest };