require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const addAllRoutes = require("./startup/routes");
const connectDatabase = require("./startup/database");
const handleLog = require("./startup/logging");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

handleLog();
addAllRoutes(app);
connectDatabase();
require("./startup/config")();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
