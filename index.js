const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const app = express();

mongoose
  .connect(
    "mongodb+srv://rufus:test123@merncluster.mcc1nk5.mongodb.net/?retryWrites=true&w=majority&appName=MERNcluster",
    { dbName: "reel_rent" }
  )
  .then(() => console.log("Connected to MongoDB Cloud Successfully"))
  .catch((err) =>
    console.error(`Error connecting to the MongoDB Cloud. \n${err}`)
  );

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
