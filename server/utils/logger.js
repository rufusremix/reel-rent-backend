const { createLogger, format, transports } = require("winston");
const { levelStyles, levelColors, colors } = require("./logStyles");

const consoleLogFormat = format.combine(
  format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  format.errors({ stack: true }),
  format.printf(({ level, message, timestamp, stack }) => {
    const levelColor = levelStyles[level] || colors.white;
    const messageColor = levelColors[level] || colors.white;

    const formattedLevel = levelColor(` ${level.toUpperCase()} `);
    const formattedMessage = messageColor(message);
    const formattedStack = stack ? colors.gray(`\nStack: ${stack}`) : "";

    return `${timestamp} ${formattedLevel} ${formattedMessage}${formattedStack}`;
  })
);

const logger = createLogger({
  level: process.env.LOG_LEVEL || "debug",
  format: format.json(),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ filename: "logfile.log" }),
  ],
  exceptionHandlers: [new transports.File({ filename: "exception.log" })],
  rejectionHandlers: [new transports.File({ filename: "rejections.log" })],
});

// Update this to make the process exit when an uncaught exception
// logger.exitOnError = false;

module.exports = logger;
