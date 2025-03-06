const Joi = require("joi");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");

const signup = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, error: { message: error.details[0].message } });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ success: false, error: { message: "User already exists" } });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res
    .status(201)
    .json({ success: true, message: "User registered successfully!" });

  function validateUser(user) {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(20).required(),
    });

    return schema.validate(user);
  }
};

const login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, error: { message: error.details[0].message } });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      success: false,
      error: { message: "Invalid email or password." },
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      success: false,
      error: { message: "Invalid email or password." },
    });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await user.addRefreshToken(refreshToken);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    // maxAge: 50000, // 5 seconds
    sameSite: "None",
  });

  res.status(200).json({
    success: true,
    message: "Login successfull!",
    user: _.pick(user, ["name", "email", "isAdmin"]),
    accessToken,
  });

  function validateLogin(user) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(20).required(),
    });

    return schema.validate(user);
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(400).json({
      success: false,
      error: { message: "Refresh token is required" },
    });

  try {
    const decoded = jwt.verify(
      refreshToken,
      config.get("refreshTokenSecretKey")
    );
    const userId = decoded.sub;

    const user = await User.findOne({ _id: userId });
    if (!user || !(await user.validateRefreshToken(refreshToken)))
      return res
        .status(403)
        .json({ success: false, error: { message: "Access denied." } });

    await user.removeRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await user.addRefreshToken(newRefreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      // maxAge: 50000, // 5 seconds
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "New access token provided",
      accessToken: newAccessToken,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(403).json({
        success: false,
        error: { message: "Session expired. Please log in again." },
      });

    return res
      .status(401)
      .json({ success: false, error: { message: "Invalid refresh token." } });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.sendStatus(204);
    }

    const decoded = jwt.verify(
      refreshToken,
      config.get("refreshTokenSecretKey")
    );
    const user = await User.findOne({ _id: decoded.sub });
    if (!user) {
      throw new Error("User not found.");
    }

    await user.removeRefreshToken(refreshToken);
  } catch (error) {
    console.log("Error", error);
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = { signup, login, logout, refreshToken };
