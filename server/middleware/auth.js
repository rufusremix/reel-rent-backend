const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  /*
        In this function auth stands for Authorization.
        Only the requests with a valid header property will
        successfully pass this middleware.
    */
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader)
    return res
      .status(400)
      .json({ message: "No authorization header provided." });

  if (!authHeader.startsWith("Bearer "))
    return res.status(400).json({ message: "Invalid Token Format." });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(400)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, config.get("auth.accessTokenSecret"));
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res
        .status(401)
        .json({ message: "Token expired. Please refresh your session." });
    else if (err.name === "JsonWebTokenError")
      return res.status(403).json({ message: "Invalid token." });
    else return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = auth;
