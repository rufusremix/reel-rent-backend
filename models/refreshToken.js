const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdOn: { type: Date, default: Date.now },
  revoked: {
    type: Date,
  },
  revokedByToken: {
    type: String,
  },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

exports.RefreshToken = RefreshToken;
