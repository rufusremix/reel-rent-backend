const config = require("config");

module.exports = function () {
  const requiredConfigs = [
    {
      key: "accessTokenSecretKey",
      errorMsg: "FATAL ERROR: Access Token Secret Key is not set",
    },
    {
      key: "refreshTokenSecretKey",
      errorMsg: "FATAL ERROR: Refresh Token Secret Key is not set",
    },
  ];

  requiredConfigs.forEach(({ key, errorMsg }) => {
    if (!config.get(key)) {
      throw new Error(errorMsg);
      // process.exit(1);
    }
  });
};
