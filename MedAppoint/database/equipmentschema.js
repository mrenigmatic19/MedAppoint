const mongoose = require("mongoose")
require("../backend/connection")
const equipmentschema = new mongoose.Schema({
    
    hospitalid:
    {
        type:Number,
        required:true,
        unique:false
    },
   instrumentname : {
        type: String,
        required:true,
        unique:false
    },
    type: {
        type: String,
        required:true,
        unique:false
    },
    availability: {
        type: String,
        required:true,
        unique:false
       
    },
    
    })
    const Equipmentinfo=new mongoose.model("Equipment_Info",equipmentschema,"Equipment_Info")
module.exports=Equipmentinfo

