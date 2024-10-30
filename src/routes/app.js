const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors'); 
const app = express();

app.use(express.json()); 
app.use(morgan('dev'));
app.use(cors()); 

const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/userRoutes'); 
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes'); 

app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/users', userRoutes); 
app.use('/api/v1/accounts', accountRoutes); 
app.use('/api/v1/transactions', transactionRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; 