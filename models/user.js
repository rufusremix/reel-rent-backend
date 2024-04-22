const Joi = require("joi");
const mongoose = require("mongoose");

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
});

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
