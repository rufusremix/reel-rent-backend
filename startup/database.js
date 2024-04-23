const mongoose = require("mongoose");

function connectDatabase() {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.dbName;
  mongoose
    .connect(uri, { dbName })
    .then(() => console.log("Connected to MongoDB Cloud Successfully"))
    .catch((err) =>
      console.error(`Error connecting to the MongoDB Cloud. \n${err}`)
    );
}

module.exports = connectDatabase;
