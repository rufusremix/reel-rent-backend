const express = require("express");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const app = express();

mongoose
  .connect("mongodb://localhost/reel_rent")
  .then(() => console.log("Connected to MongoDB Successfully"))
  .catch((err) => console.log("Could not connect to MongoDB"));

app.use(express.json());
app.use("/api/genres", genres);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
