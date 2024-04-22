const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  res.send(token);
});

function validate(authReq) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(20).required(),
  });

  return schema.validate(authReq);
}

module.exports = router;
