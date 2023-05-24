"use strict";

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/MedAppoint").then(function () {
  console.log("connection successfull");
})["catch"](function (e) {
  console.log(e);
});
var hospitalschema = new mongoose.Schema({
  hospitalname: {
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
  org: {
    type: String,
    required: true,
    unique: false
  },
  pin: {
    type: Number,
    required: true,
    unique: false
  },
  establishedin: {
    type: Number,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    unique: false
  },
  address: {
    type: String,
    required: true,
    unique: false
  }
});
var Hospinfo = new mongoose.model("Hospital_Info", hospitalschema, "Hospital_Info");
module.exports = Hospinfo;