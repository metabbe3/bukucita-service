// src/app.js
const express = require("express");
const corsMiddleware = require("./middlewares/corsMiddleware");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const defaultRoutes = require("./routes/defaultRoutes");
const logger = require('../helpers/logger');

// Load environment variables from .env
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsMiddleware);

app.use(categoryRoutes);
app.use(bookRoutes);
app.use(defaultRoutes);

// Use the environment variables directly
const { PORT, HOST } = process.env;
app.listen(PORT, HOST, () => {
  logger.info(`Server started on http://${HOST}:${PORT}`);
});
