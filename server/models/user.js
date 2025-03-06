const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  refreshTokens: {
    type: [
      {
        token: { type: String, required: true },
        expiresAt: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

userSchema.methods.addRefreshToken = async function (token) {
  this.refreshTokens.push({
    token: token,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  await this.save();
};

userSchema.methods.validateRefreshToken = async function (plainToken) {
  for (const storedToken of this.refreshTokens) {
    if (plainToken === storedToken.token) return true;
  }

  return false;
};

userSchema.methods.removeRefreshToken = async function (plainToken) {
  // this.refreshTokens = this.refreshTokens.filter(
  //   (storedToken) => plainToken !== storedToken.token
  // );

  // await this.save();
  await this.constructor.findOneAndUpdate(
    { _id: this._id },
    { $pull: { refreshTokens: { token: plainToken } } },
    { new: true }
  );
};

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(20).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
