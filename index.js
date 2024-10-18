const express = require('express');
const { PrismaClient } = require('@prisma/client'); 
const app = express();
const prisma = new PrismaClient(); 

app.use(express.json());

// Endpoint for add new user
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

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
