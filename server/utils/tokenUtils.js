const jwt = require("jsonwebtoken");
const config = require("config");

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    config.get("accessTokenSecretKey"),
    { expiresIn: "1m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email },
    config.get("refreshTokenSecretKey")
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
