const mongoose = require("mongoose")
require("../backend/connection")
const bedschema = new mongoose.Schema({
    hospitalid:
    {
        type:String,
        required:true,
        unique:false
    },
    publicward: {
        type: Number,
        required:true,
        unique:false
    },
    privateward: {
        type: Number,
        required:true,
        unique:false
    },
    disease: {
        type: String,
        required:true,
        unique:false
       
    },

    cost: {
        type: Number,
        required:true,
        unique:false
    },
    wards: {
        type: Number,
        required:true,
        unique:false
    }
    })
    const Bedinfo=new mongoose.model("Bed_Info",bedschema,"Bed_Info")
module.exports=Bedinfo
