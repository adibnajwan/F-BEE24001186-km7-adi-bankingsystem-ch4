// src/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rute yang diperlukan
const authRoutes = require('./routes/auths'); // Jalur yang benar untuk auth
const userRoutes = require('./routes/users');
const accountRoutes = require('./routes/accounts');
const transactionRoutes = require('./routes/transactions');

// Gunakan rute
app.use('/api/v1/auth', authRoutes); // Memastikan rute untuk login ada di sini
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/transactions', transactionRoutes);

module.exports = app;