const mongoose = require("mongoose")
require("../backend/connection")
const userschema = new mongoose.Schema({
    username : {
        type: String,
        required:true,
        unique:false
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    contact: {
        type: Number,
        required:true,
        unique:true
       
    },
    dob: {
        type: String,
        required:true,
        unique:false
    },
    pin: {
        type: Number,
        required:true,
        unique:false
    },
       gender: {
        type: String,
        required:true,
        unique:false
    },
    password: {
        type: String,
        required:true,
        unique:false
    },

    address: {
        type: String,
        required:true,
        unique:false
    }
    })
    const Userinfo=new mongoose.model("User_Info",userschema,"User_Info")
module.exports=Userinfo
