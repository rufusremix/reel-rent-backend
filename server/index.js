require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const ensureConfig = require("./startup/config");
const addAllRoutes = require("./startup/routes");
const connectDatabase = require("./startup/database");
const handleLog = require("./startup/logging");
const logger = require("./utils/logger");
const app = express();
handleLog();
app.use(cookieParser());
app.use(
  cors({
    origin: config.get("server.cors.origin"),
    methods: config.get("server.cors.methods"),
    credentials: config.get("server.cors.credentials"),
  })
);

addAllRoutes(app);
connectDatabase();
ensureConfig();

const PORT = config.get("server.port");
app.listen(PORT, () => {
  logger.info(`Listening on Port ${PORT}`);
});
