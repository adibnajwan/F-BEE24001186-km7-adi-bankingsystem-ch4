// src/app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.yaml");

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auths");
const userRoutes = require("./routes/users");
const accountRoutes = require("./routes/accounts");
const transactionRoutes = require("./routes/transactions");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
