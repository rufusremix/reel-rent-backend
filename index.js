require("dotenv").config();
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not set");
  process.exit(1);
}

const uri = process.env.MONGO_URI;
const dbName = process.env.dbName;
mongoose
  .connect(uri, { dbName })
  .then(() => console.log("Connected to MongoDB Cloud Successfully"))
  .catch((err) =>
    console.error(`Error connecting to the MongoDB Cloud. \n${err}`)
  );

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
