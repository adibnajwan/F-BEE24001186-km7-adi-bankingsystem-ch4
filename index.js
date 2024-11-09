const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const app = express();

const swaggerDocument = YAML.load('./docs/swagger.yaml'); 

const userRoutes = require('./src/routes/users');
const accountRoutes = require('./src/routes/accounts');
const transactionRoutes = require('./src/routes/transactions');
const mediaRoutes = require('./src/routes/media');  

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/media', mediaRoutes); 

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
