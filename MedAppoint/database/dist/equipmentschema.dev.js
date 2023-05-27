"use strict";

var mongoose = require("mongoose");

require("../backend/connection");

var equipmentschema = new mongoose.Schema({
  hospitalid: {
    type: String,
    required: true,
    unique: false
  },
  instrumentname: {
    type: String,
    required: true,
    unique: false
  },
  type: {
    type: String,
    required: true,
    unique: false
  },
  availability: {
    type: String,
    required: true,
    unique: false
  }
});
var Equipmentinfo = new mongoose.model("Equipment_Info", equipmentschema, "Equipment_Info");
module.exports = Equipmentinfo;