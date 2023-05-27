const mongoose = require("mongoose")
require("../backend/connection")
const appointmentsschema = new mongoose.Schema({
    hospitalid:
    {
        type:String,
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
    bookingslot:{
        type:Number,
        required:true,
        uique: false
    }
    
    })
    const Appointmentinfo=new mongoose.model("Appointment_Info",appointmentsschema,"Appointment_Info")
module.exports=Appointmentinfo
