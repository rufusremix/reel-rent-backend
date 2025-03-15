const chalk = require("chalk");

const levelStyles = {
  error: chalk.bgRed.white.bold,
  warn: chalk.bgYellow.white.bold,
  info: chalk.bgGreen.white.bold,
  debug: chalk.bgBlue.white.bold,
  http: chalk.bgMagenta.white.bold,
};

const levelColors = {
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.green,
  debug: chalk.blue,
  http: chalk.magenta,
};

const colors = {
  gray: chalk.gray,
};

module.exports = { levelStyles, levelColors, colors };
