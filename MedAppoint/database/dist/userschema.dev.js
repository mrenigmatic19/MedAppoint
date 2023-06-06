"use strict";

var mongoose = require("mongoose");

require("../backend/connection");

var userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: Number,
    required: true,
    unique: true
  },
  dob: {
    type: String,
    required: true,
    unique: false
  },
  pin: {
    type: String,
    required: true,
    unique: false
  },
  gender: {
    type: String,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  address: {
    type: String,
    required: true,
    unique: false
  }
});
var Userinfo = new mongoose.model("User_Info", userschema, "User_Info");
module.exports = Userinfo;