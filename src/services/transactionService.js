const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTransaction = async (data) => {
  return await prisma.transaction.create({
    data: {
      fromAccountId: parseInt(data.fromAccountId),
      toAccountId: parseInt(data.toAccountId),
      amount: data.amount,
    },
  });
};

const getAllTransactions = async () => {
  return await prisma.transaction.findMany({
    include: {
      fromAccount: true,
      toAccount: true,
    },
  });
};

const getTransactionById = async (transactionId) => {
  return await prisma.transaction.findUnique({
    where: { id: parseInt(transactionId) },
    include: {
      fromAccount: true,
      toAccount: true,
    },
  });
};

module.exports = { createTransaction, getAllTransactions, getTransactionById };