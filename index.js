const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const accountRoutes = require('./routes/accounts');
const transactionRoutes = require('./routes/transactions');

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/transactions', transactionRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});