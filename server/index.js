require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const addAllRoutes = require("./startup/routes");
const connectDatabase = require("./startup/database");
const handleLog = require("./startup/logging");
const logger = require("./utils/logger");

const app = express();
handleLog();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

addAllRoutes(app);
connectDatabase();
require("./startup/config")();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Listening on Port ${PORT}`);
});
