const mongoose = require("mongoose");

const { Schema } = mongoose;

const userDetails = new Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  emailverified: {
    type: Boolean,
    default: false,
  },
  merchant: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "member",
    enum: ["admin", "member", "merchant"],
  },
  updated: {
    type: Date,
  },
  randomOtp: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  facebookID: {
    type: String,
  },
  linkedinID: {
    type: String,
  },
});

module.exports = mongoose.model("Users", userDetails);
