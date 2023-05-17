const express= require("express")
const http=require("http")
const app=express()
const port=3000
const hostname='127.0.0.1'
const path=require("path")
const hbs=require('hbs')
const templatepath=path.join(__dirname,'../public')
app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatepath)

app.get("/",async (req,res)=>{
    res.render("index.hbs")
})
app.get("/login_hosptial",async (req,res)=>{
    res.render("login_hosptial.hbs")
})
app.get("/login_user",async (req,res)=>{
    res.render("login_user.hbs")
})
app.get("/about",async (req,res)=>{
    res.render("about.hbs")
})
app.get("/contact",async (req,res)=>{
    res.render("contactUs.hbs")
})
app.get("/explore",async (req,res)=>{
    res.render("explore.hbs")
})
app.get("/hospital",async (req,res)=>{
    res.render("hospital.hbs")
})

app.get("/explore",async (req,res)=>{
    res.render("explore.hbs")
})
app.get("/signup_hospital",async (req,res)=>{
    res.render("signup_hospital.hbs")
})
app.get("/signup_user",async (req,res)=>{
    res.render("signup_user.hbs")
})

app.listen(port,hostname,()=>{
console.log("Server is Running!")
})
