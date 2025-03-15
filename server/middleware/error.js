const winston = require("winston");
const logger = require("../utils/logger");

module.exports = function (err, req, res, next) {
  // Logging the exceptions
  logger.error(err.message, { stack: err.stack });
  res.status(500).send("Something failed midd");
};
