const jwt = require("jsonwebtoken");
const config = require("config");

const generateAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id, isAdmin: user.isAdmin },
    config.get("accessTokenSecretKey"),
    { expiresIn: "1m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { sub: user._id, email: user.email },
    config.get("refreshTokenSecretKey"),
    { expiresIn: "1d" }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
