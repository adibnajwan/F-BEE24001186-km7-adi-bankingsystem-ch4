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

describe("Validation Middleware Tests", () => {
  it("should pass validation with correct data", async () => {
    const req = mockRequest({ fromAccountId: 1, toAccountId: 2, amount: 100.0 });
    const res = mockResponse();
    const next = jest.fn();

    await validateTransaction[0](req, res, next);
    await validateTransaction[1](req, res, next);
    await validateTransaction[2](req, res, next);
    await validateTransaction[3](req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should fail validation with incorrect data", async () => {
    const req = mockRequest({ fromAccountId: "abc", toAccountId: "xyz", amount: -100.0 });
    const res = mockResponse();
    const next = jest.fn();

    await validateTransaction[0](req, res, next);
    await validateTransaction[1](req, res, next);
    await validateTransaction[2](req, res, next);
    await validateTransaction[3](req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: expect.arrayContaining([
        expect.objectContaining({ msg: "From Account ID must be an integer" }),
        expect.objectContaining({ msg: "To Account ID must be an integer" }),
        expect.objectContaining({ msg: "Amount must be greater than zero" }),
      ]),
    });
  });
});
