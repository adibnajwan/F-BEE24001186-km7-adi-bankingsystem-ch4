// index.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Endpoint for adding a new user along with their profile
app.post('/api/v1/users', async (req, res) => {
  const { name, email, bio } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        profile: {
          create: {
            bio
          }
        }
      }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

// Endpoint for retrieving all users
app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
});

// Endpoint for retrieving a specific user by ID, including their profile
app.get('/api/v1/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId)
      },
      include: {
        profile: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user' });
  }
});

// Endpoint for adding a new account to an existing user
app.post('/api/v1/accounts', async (req, res) => {
  const { userId, accountNumber, balance } = req.body;

  try {
    const account = await prisma.account.create({
      data: {
        userId: parseInt(userId),
        accountNumber,
        balance
      }
    });
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: 'Error creating account' });
  }
});

// Endpoint for retrieving all accounts
app.get('/api/v1/accounts', async (req, res) => {
  try {
    const accounts = await prisma.account.findMany();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving accounts' });
  }
});

// Endpoint for retrieving account details by ID
app.get('/api/v1/accounts/:accountId', async (req, res) => {
  const { accountId } = req.params;

  try {
    const account = await prisma.account.findUnique({
      where: {
        id: parseInt(accountId)
      }
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving account' });
  }
});

// Endpoint for creating a transaction between two accounts
app.post('/api/v1/transactions', async (req, res) => {
  const { fromAccountId, toAccountId, amount } = req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        fromAccountId: parseInt(fromAccountId),
        toAccountId: parseInt(toAccountId),
        amount
      }
    });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Error creating transaction' });
  }
});

// Endpoint for retrieving all transactions
app.get('/api/v1/transactions', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        fromAccount: true,
        toAccount: true
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transactions' });
  }
});

// Endpoint for retrieving transaction details by ID
app.get('/api/v1/transactions/:transactionId', async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: parseInt(transactionId)
      },
      include: {
        fromAccount: true,
        toAccount: true
      }
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transaction' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});