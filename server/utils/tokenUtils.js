const jwt = require("jsonwebtoken");
const config = require("config");

const generateAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id, isAdmin: user.isAdmin },
    config.get("auth.accessTokenSecret"),
    { expiresIn: config.get("auth.accessTokenExpiry") }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { sub: user._id, email: user.email },
    config.get("auth.refreshTokenSecret"),
    { expiresIn: config.get("auth.refreshTokenExpiry") }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
