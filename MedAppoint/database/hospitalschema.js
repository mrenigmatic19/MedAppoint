const mongoose = require("mongoose")
require("../backend/connection")

const hospitalschema = new mongoose.Schema({
    hospitalname : {
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
    org: {
        type: String,
        required:true,
        unique:false
    },
    pin: {
        type: Number,
        required:true,
        unique:false
    },
    establishedin: {
        type: Number,
        required:true,
        unique:false
    },
    password: {
        type: String,
        required:true,
        unique:false
    },
    
    description: {
        type: String,
        unique:false
    },
    address: {
        type: String,
        required:true,
        unique:false
    }
    })
    
    
    const Hospinfo= new mongoose.model("Hospital_Info",hospitalschema,"Hospital_Info")
    module.exports=Hospinfo