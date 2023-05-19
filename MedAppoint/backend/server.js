const express= require("express")
const http=require("http")
const app=express()
const port=3000
const hostname='127.0.0.1'
const path=require("path")
const hbs=require('hbs')
const {engine} = require("express-handlebars")
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
app.get("/signup_user",async (req,res)=>{
    res.render("signup_user")
})

app.listen(port,hostname,()=>{
console.log("Server is Running!")
})
