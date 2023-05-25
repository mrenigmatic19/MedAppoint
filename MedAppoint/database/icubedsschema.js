const mongoose = require("mongoose")
require("../backend/connection")
const icubedsschema = new mongoose.Schema({
    hospitalid:
    {
        type:Number,
        required:true,
        unique:false
    },
    cost: {
        type: Number,
        required:true,
        unique:false
    },
    beds: {
        type: Numbers,
        required:true,
        unique:true
    }
    })
    const Icubedsinfo=new mongoose.model("Icubeds_Info",icubedsschema,"Icubeds_Info")
module.exports=Icubedsinfo
