const express= require("express")
const http=require("http")
const app=express()
const port=3000
const hostname='127.0.0.1'
const path=require("path")
const hbs=require('hbs')
const hospinfo=require("./connection")
const { checkPrime } = require("crypto")
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
            res.render("home")}
            else{
                res.send("wrong password")
            }
    }
    catch{
        res.send("wrond details")
    }
    
})
app.get("/login_user",async (req,res)=>{
    res.render("login_user")
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
            await hospinfo.insertMany([newhospreg]),
            res.render("login_hospital")
        }
    else{
        res.send("password is not matching")
    }
}
)
app.get("/signup_user",async (req,res)=>{
    res.render("signup_user")
})

app.listen(port,hostname,()=>{
console.log("Server is Running!")
})
