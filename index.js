const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const app = express();
const http = require('http'); 
const socketIO = require('socket.io');

const swaggerDocument = YAML.load('./docs/swagger.yaml'); 

const userRoutes = require('./src/routes/users');
const accountRoutes = require('./src/routes/accounts');
const transactionRoutes = require('./src/routes/transactions');
const mediaRoutes = require('./src/routes/media');  
const app = require('./src/app'); 
const server = http.createServer(app); 
const io = socketIO(server);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/media', mediaRoutes); 

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.emit('welcome', { message: 'Welcome to Skybank!' });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;