const mongoose = require("mongoose");
const logger = require("../utils/logger");

function connectDatabase() {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.dbName;
  mongoose
    .connect(uri, { dbName })
    .then(() => logger.info("Connected to MongoDB Successfully"))
    .catch((err) =>
      logger.error(`Error connecting to the MongoDB.`, { stack: err.stack })
    );
}

module.exports = connectDatabase;
