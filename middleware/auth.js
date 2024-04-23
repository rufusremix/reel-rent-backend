const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  /*
        In this function auth stands for Authorization.
        Only the requests with a valid header property will
        successfully pass this middleware.
    */
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
