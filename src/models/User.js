const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
  static async createUser(data) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password, 
      },
    });
  }

  static async findOne(criteria) {
    return await prisma.user.findUnique({
      where: criteria,
    });
  }
}

module.exports = User;
