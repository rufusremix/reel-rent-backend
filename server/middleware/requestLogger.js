const logger = require("../utils/logger");
const morgan = require("morgan");

const morganFormat =
  "[:method] :url → Status: :status, Response Time: :response-time ms";

const requestLogger = morgan(morganFormat, {
  stream: {
    write: (message) => {
      logger.http(message.trim());
    },
  },
});

module.exports = requestLogger;
