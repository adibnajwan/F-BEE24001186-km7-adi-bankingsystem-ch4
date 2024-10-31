// src/services/accountService.js
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

// Fungsi untuk mendapatkan akun berdasarkan ID pengguna
const getAccountsByUserId = async (userId) => {
  return await prisma.account.findMany({
    where: { userId: parseInt(userId) },
  });
};

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
  getAccountsByUserId, // Pastikan untuk mengeksport fungsi ini
};