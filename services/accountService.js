const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAccount = async (data) => {
  return await prisma.account.create({
    data: {
      userId: parseInt(data.userId),
      accountNumber: data.accountNumber,
      balance: data.balance,
    },
  });
};

const getAllAccounts = async () => {
  return await prisma.account.findMany();
};

const getAccountById = async (accountId) => {
  return await prisma.account.findUnique({
    where: { id: parseInt(accountId) },
  });
};

module.exports = { createAccount, getAllAccounts, getAccountById };