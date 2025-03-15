const logger = require("../utils/logger");

function handleLog() {
  process.on("uncaughtException", (err) => {
    logger.error(err.message, err);
    process.exit(1);
  });
  process.on("unhandledRejection", (err) => {
    logger.error(err.message, err);
    process.exit(1);
  });
}

module.exports = handleLog;
