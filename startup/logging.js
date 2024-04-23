const winston = require("winston");
require("winston-mongodb");

function handleLog() {
  process.on("uncaughtException", (err) => {
    console.log("An uncaught exception happened.");
    winston.error(err.message, err);
    // process.exit(1);
  });
  process.on("unhandledRejection", (err) => {
    console.log("An unhandled Rejection happened.");
    winston.error(err.message, err);
    // process.exit(1);
  });
  winston.add(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
    })
  );
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  );

  winston.add(
    new winston.transports.MongoDB({
      db: process.env.MONGO_URI,
      dbName: process.env.dbName,
      options: {
        useUnifiedTopology: true,
      },
    })
  );
}

module.exports = handleLog;
