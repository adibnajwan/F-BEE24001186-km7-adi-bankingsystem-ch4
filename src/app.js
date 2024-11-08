const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.yaml");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auths");
const userRoutes = require("./routes/users");
const accountRoutes = require("./routes/accounts");
const transactionRoutes = require("./routes/transactions");
const mediaRoutes = require("./routes/media");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use('/api/v1/media', mediaRoutes); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;