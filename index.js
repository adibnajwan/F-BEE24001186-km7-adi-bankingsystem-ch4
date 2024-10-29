const express = require('express');
const app = express();
const userController = require('./controllers/userController');
const accountController = require('./controllers/accountController');
const transactionController = require('./controllers/transactionController');

app.use(express.json());

app.use('/api/v1/users', userController);
app.use('/api/v1/accounts', accountController);
app.use('/api/v1/transactions', transactionController);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});