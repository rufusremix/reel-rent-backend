const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("config");

function connectDatabase() {
  const uri = config.get("db.uri");
  const dbName = config.get("db.name");

  mongoose
    .connect(uri, { dbName })
    .then(() => logger.info("Connected to MongoDB Successfully"))
    .catch((err) =>
      logger.error(`Error connecting to the MongoDB.`, { stack: err.stack })
    );
}

module.exports = connectDatabase;
