const mongoose = require("mongoose")
require("../backend/connection")
const surgeryshcema = new mongoose.Schema({
    hospitalid:
    {
        type:Number,
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
        unique:true
    },
    cost: {
        type: Number,
        required:true,
        unique:true
       
    },
    doctor: {
        type: String,
        required:true,
        unique:false
    },
    
    })
    const Surgeryinfo=new mongoose.model("Surgery_Info",surgeryschema,"Surgery_Info")
module.exports=Surgeryinfo
