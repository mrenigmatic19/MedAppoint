const express= require("express")
const app=express()
const port=3000
const hostname='127.0.0.1'
const path=require("path")
const hbs=require('hbs')
require("./connection")
const bcrypt = require("bcrypt")

const session = require("express-session")
const hospinfo=require("../database/hospitalschema")
const userinfo=require("../database/userschema")
const equipmentinfo=require("../database/equipmentschema")
const icubedinfo=require("../database/icubedsschema")
const appointmentinfo=require("../database/appointmentsschema")
const bedinfo=require("../database/bedschema")
const surgeryinfo=require("../database/surgeryschema")
const mongosession=require("connect-mongodb-session")(session)
app.use(express.json())

app.use(express.urlencoded({extended:false}))

const store=new mongosession({
    uri:"mongodb://127.0.0.1:27017/MedAppoint",
    collection:"mysessions"
})

app.use(session({
    secret:"MedAppoint",
    resave:false,
    saveUninitialized:false,
    store:store
}))


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
        const chk = await userinfo.findOne({email:req.body.email})
        if(!chk){
        res.redirect("login")}
        const ismatch=await bcrypt.compare(req.body.password,chk.password)
        if(ismatch){
            req.session.isAuth=true;
            res.redirect("hospitaldetails")}
            else{
                res.send("wrong password")
            }
    }
    catch{
        res.send("wrong details")
    }

})
const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next()
    }
    else{
        res.redirect("/")
    }
}
app.get("/home",isAuth,async (req,res)=>{
    res.render("home")
   
})
app.get("/login_user",async (req,res)=>{
    res.render("login_user")
})
app.post("/login_user",async (req,res)=>{
    try{
        const chk = await userinfo.findOne({email:req.body.email})
        if(!chk){
        res.redirect("login")}
        const ismatch=await bcrypt.compare(req.body.password,chk.password)
        if(ismatch){
            req.session.isAuth=true;
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
app.get("/hospitaldetails",isAuth,async(req,res)=>{
    res.render("hospitaldetails")
})
app.post("/signup_hospital", async (req,res)=>{
        const hashpwd= await bcrypt.hash(req.body.password,12)
        const cpass=await bcrypt.compare(req.body.confirmpassword,hashpwd)
        if(cpass){
            const newhospreg=new hospinfo({
                hospitalname : req.body.hospitalname,
                email:req.body.email,
                contact: req.body.contact,
                org:req.body.org,
                pin:req.body.pin ,
                establishedin:req.body.establishedin,
                password:hashpwd,
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
    res.render("signup_user")
})
app.post("/signup_user", async (req,res)=>{
    const hashpwd= await bcrypt.hash(req.body.password,12)
    const cpass=await bcrypt.compare(req.body.confirmpassword,hashpwd)
    
    if(cpass){
        const newuserreg=new userinfo({
            username : req.body.username,
            email:req.body.email,
            contact: req.body.contact,
            dob:req.body.dob,
            pin:req.body.pin ,
            gender:req.body.gender,
            password:hashpwd,
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
app.post("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err)throw err;
        res.redirect("/");
    })
})
app.listen(port,hostname,()=>{
console.log("Server is Running!")
})
