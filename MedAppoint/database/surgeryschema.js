const mongoose = require("mongoose")
require("../backend/connection")
const surgeryschema = new mongoose.Schema({
    hospitalid:
    {
        type: String,
        required:true,
        unique:false
    },
    yoe : {
        type: Number,
        required:true,
        unique:false
    },
    specialist: {
        type: String,
        required:true,
        unique:false
    },
    cost: {
        type: Number,
        required:true,
        unique:false
       
    },
    doctor: {
        type: String,
        required:true,
        unique:false
    },
    
    })
    const Surgeryinfo=new mongoose.model("Surgery_Info",surgeryschema,"Surgery_Info")
module.exports=Surgeryinfo
