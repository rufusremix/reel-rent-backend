const config = require("config");

module.exports = function () {
  const requiredConfigs = [
    "auth.accessTokenSecret",
    "auth.refreshTokenSecret",
    "auth.accessTokenExpiry",
    "auth.refreshTokenExpiry",
  ];

  requiredConfigs.forEach((key) => {
    if (!config.get(key)) {
      throw new Error(
        `Missing required config: [${key}]. Set the environment variable!`
      );
    }
  });
};
