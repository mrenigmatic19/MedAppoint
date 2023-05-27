const express= require("express")
const http=require("http")
const app=express()
const port=3000
const hostname='127.0.0.1'
const path=require("path")
const hbs=require('hbs')
require("./connection")
const hospinfo=require("../database/hospitalschema")
const userinfo=require("../database/userschema")
const equipmentinfo=require("../database/equipmentschema")
const icubedinfo=require("../database/icubedsschema")
const appointmentinfo=require("../database/appointmentsschema")
const bedinfo=require("../database/bedschema")
const surgeryinfo=require("../database/surgeryschema")
app.use(express.json())
app.use(express.urlencoded({extended:false}))



const templatepath=path.join(__dirname,'../public')
app.use(express.static("../public"))



app.set("view engine","hbs")
app.set("views",templatepath)

app.get("/",async (req,res)=>{
    res.render("index")
})

app.get("/login_hospital",async (req,res)=>{
    res.render("login_hospital")
})
app.post("/login_hospital",async (req,res)=>{
    try{
        const chk = await hospinfo.findOne({email:req.body.email})
        if(chk.password===req.body.password){
            res.redirect("home")}
            else{
                res.send("wrong password")
            }
    }
    catch{
        res.send("wrong details")
    }
    
})
app.get("/home",async (req,res)=>{
    res.render("home")
})
app.get("/login_user",async (req,res)=>{
    res.render("login_user")
})
app.post("/login_user",async (req,res)=>{
    try{
        const chk = await userinfo.findOne({email:req.body.email})
        if(chk.password===req.body.password){
            res.redirect("home")}
            else{
                res.send("wrong password")
            }
    }
    catch{
        res.send("wrong details")
    }
    
})
app.get("/about",async (req,res)=>{
    res.render("about")
})
app.get("/contactUs",async (req,res)=>{
    res.render("contactUs")
})
app.get("/explore",async (req,res)=>{
    res.render("explore")
})
app.get("/hospital",async (req,res)=>{
    res.render("hospital")
})

app.get("/explore",async (req,res)=>{
    res.render("explore")
})
app.get("/signup_hospital",async (req,res)=>{
    res.render("signup_hospital")
})
app.post("/signup_hospital", async (req,res)=>{
   
        const pass=req.body.password
        const cpass=req.body.confirmpassword
        if(pass===cpass){
            const newhospreg=new hospinfo({
                hospitalname : req.body.hospitalname,
                email:req.body.email,
                contact: req.body.contact,
                org:req.body.org,
                pin:req.body.pin ,
                establishedin:req.body.establishedin,
                password:req.body.password,
                description: "hlo",
                address:req.body.address
            })
            await hospinfo.insertMany([newhospreg])
            res.redirect("login_hospital")
        }
    else{   
        res.send("password is not matching")
    }
}
)
app.get("/signup_user",async (req,res)=>{
    res.redirect("signup_user")
})
app.post("/signup_user", async (req,res)=>{
   
    const pass=req.body.password
    const cpass=req.body.confirmpassword
    if(pass===cpass){
        const newuserreg=new userinfo({
            username : req.body.username,
            email:req.body.email,
            contact: req.body.contact,
            dob:req.body.dob,
            pin:req.body.pin ,
            gender:req.body.gender,
            password:req.body.password,
            address:req.body.address
        })
        await userinfo.insertMany([newuserreg])
        res.redirect("login_user")
    }
else{   
    res.send("password is not matching")
}
}
)
app.get("/equipments",async(req,res)=>{
    res.render("equipments")
})
app.post("/equipments", async(req,res)=>{
    const newequipmentreg=new equipmentinfo({
        hospitalid:"hlo",
        instrumentname:req.body.instrumentname,
        type:req.body.type,
        availability:req.body.availability
    })
    await equipmentinfo.insertMany([newequipmentreg])
    res.redirect("equipments")
})
app.get("/icubeds",async(req,res)=>{
    res.render("icubeds")
})
app.post("/icubeds", async(req,res)=>{
    const newicubedreg=new icubedinfo({
        hospitalid:"hlo",
        cost:req.body.cost,
        beds:req.body.beds
    })
    await icubedinfo.insertMany([newicubedreg])
    res.redirect("icubeds")
})
app.get("/appointments",async(req,res)=>{
    res.render("appointments")
})
app.post("/appointments", async(req,res)=>{
    const newappointmentreg=new appointmentinfo({
        hospitalid:"hlo",
        doctor:req.body.doctor,
        specialist:req.body.specialist,
        cost:req.body.cost,
        yoe:req.body.yoe,
        bookingslot:req.body.bookingslot
    })
    await appointmentinfo.insertMany([newappointmentreg])
    res.redirect("appointments")
})
app.get("/beds",async(req,res)=>{
    res.render("beds")
})
app.post("/beds", async(req,res)=>{
    const newbedreg=new bedinfo({
        hospitalid:"hlo",
        publicward:req.body.publicward,
        privateward:req.body.privateward,
        wards:req.body.wards,
        disease:req.body.disease
    })
    await bedinfo.insertMany([newbedreg])
    res.redirect("beds")
})
app.get("/surgeries",async(req,res)=>{
    res.render("surgeries")
})
app.post("/surgeries", async(req,res)=>{
    const newsurgeryreg=new surgeryinfo({
        hospitalid:"hlo",
        doctor:req.body.doctor,
        specialist:req.body.specialist,
        cost:req.body.cost,
        yoe:req.body.yoe,
       
    })
    await surgeryinfo.insertMany([newsurgeryreg])
    res.redirect("surgeries")
})
app.listen(port,hostname,()=>{
console.log("Server is Running!")
})
