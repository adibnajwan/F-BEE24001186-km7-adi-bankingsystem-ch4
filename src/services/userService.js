const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (data) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      profile: {
        create: { bio: data.bio },
      },
    },
  });
};

const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: { profile: true },
  });
};

const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: { profile: true },
  });
};

module.exports = { createUser, getAllUsers, getUserById };