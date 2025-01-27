const Joi = require("joi");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");
const { RefreshToken } = require("../models/refreshToken");

const signup = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.status(201).send("User registered successfully!");

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
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const newRefreshToken = new RefreshToken({
    userId: user._id,
    token: refreshToken,
  });

  await newRefreshToken.save();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: true,
    maxAge: 5000, // 5 seconds
  });

  res.status(200).json({ accessToken });

  function validateLogin(user) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(20).required(),
    });

    return schema.validate(user);
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).send("Refresh token is required");

  const storedRefreshToken = await RefreshToken.findOne({
    token: refreshToken,
  });
  if (!storedRefreshToken) return res.status(401).send("Invalid refresh token");

  await RefreshToken.deleteOne({ token: refreshToken });
  res.status(200).send("Logged out successfully");
};

module.exports = { signup, login, logout };
