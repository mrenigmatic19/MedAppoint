//----------------------------------Libraries------------------------------------------------


const express= require("express")
const path=require("path")
const bcrypt = require("bcrypt")
const session = require("express-session")
const flash=require("connect-flash")
const mongosession=require("connect-mongodb-session")(session)
const ejs=require("ejs")


//---------------------------------Hosting Port-----------------------------------------------


const port=3000
const hostname='127.0.0.1'
require("./connection")


//--------------------------------Database Schema---------------------------------------------


const hospinfo      =   require("../database/hospitalschema")
const userinfo      =   require("../database/userschema")
const equipmentinfo =   require("../database/equipmentschema")
const icubedinfo    =   require("../database/icubedsschema")
const appointmentinfo =  require("../database/appointmentsschema")
const bedinfo       =   require("../database/bedschema")
const surgeryinfo   =   require("../database/surgeryschema")
const {getDistance}   =   require("./getdistance")


//--------------------------------Database Link-----------------------------------------------


const store=new mongosession({
    uri:"mongodb://127.0.0.1:27017/MedAppoint",
    collection:"mysessions"
})


//---------------------------------Middleware--------------------------------------------------

const app=express()
app.use(express.json())
app.use(flash())
app.use(express.urlencoded({extended:false}))
app.use(express.static("../public"))
app.use(session({
    secret:"MedAppoint",
    resave:false,
    saveUninitialized:false,
    store:store
}))


//------------------------------------Engine Setting------------------------------------------

const templatepath=path.join(__dirname,'../public')
app.set("view engine","ejs")
app.set("views",templatepath)


//----------------------------------Login Credential------------------------------------------


const loginuid=async(req,res,next)=>{
    next()
}

const loginhid=async(req,res,next)=>{
    next()
}

const detail=async(req,res,next)=>{
    next()
}

const value=async(req,res,next)=>{
    next()
}

//----------------------------------Authorization---------------------------------------------


const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next()
    }
    else{
        res.redirect("/")
    }
}


//----------------------------------Searching Algorithm----------------------------------------

app.get("/searching",isAuth,async(req,res)=>{
    const array=[]
    const val=req.session.value
    if(req.session.detail){
    const details=req.session.detail
    const user= await userinfo.find({_id:req.session.loginuid})
   
    const pin1=user[0].pin
    for(let i=0;i<details.length;i++){
        const h=await hospinfo.find({_id:details[i].hospitalid})
        const pin2=h[0].pin
        const distance=await getDistance(pin1,pin2)
        array.push([details[i],h[0],distance])
    }
    
    for(let i = 0; i < array.length; i++) {
        let min = i;
        for(let j = i+1; j < array.length; j++){
            if(array[j][2] < array[min][2]) {
                min=j; 
            }
         }
         if (min != i) {
             
             let tmp = array[i]; 
             array[i] = array[min];
             array[min] = tmp;      
        }
    }
  console.log(array)
}
    res.render("searching",{message:req.flash('msg'),array,val})
})

app.post("/searching",async(req,res)=>{
    try{
            const val=req.body.value
            if(val){
                const string=req.body.search
                if(string){
                const array=string.split(' ')
                let a=[]
                for(let i=0;i<array.length;i++){
                    if(val==4){
                    const table=await appointmentinfo.find({specialist:array[i]})
                    table.forEach((x)=>{
                        a.push(x)
                    })
                    }
                    else if(val==1){
                        const table=await equipmentinfo.find({$or:[{instrumentname:array[i]},{type:array[i]}]})
                        table.forEach((x)=>{
                            a.push(x)
                        })
                        
                    }
                    else if(val==0){
                        const table=await icubedinfo.find({})
                        table.forEach((x)=>{
                            a.push(x)
                        })
                    }
                    else if(val==3){
                        const table=await bedinfo.find({disease:array[i]})
                        table.forEach((x)=>{
                            a.push(x)
                        })
                    }
                    else{
                        const table=await surgeryinfo.find({specialist:array[i]})
                        table.forEach((x)=>{
                            a.push(x)
                        })
                    }
                }
                req.flash('msg','Searching Successful')
                    req.session.detail=a
                    req.session.value=val
                    res.redirect("searching")                   
              
            }
            else{
                req.flash('msg','Empty Search')
                res.redirect("searching")
            }
            }
            else{
                req.flash('msg','Select respective field')
                res.redirect("searching")
            }
    }
    catch{
        req.flash('msg','Search Something')
        res.redirect("searching")
    }
})


//--------------------------------------Index--------------------------------------------------


app.get("/",async (req,res)=>{
    res.render("index")
})


//---------------------------------Login Hopspital--------------------------------------------


app.get("/login_hospital",async (req,res)=>{
    res.render("login_hospital",{message:req.flash('msg')})
})

app.post("/login_hospital",async (req,res)=>{
    try{
        const chk = await hospinfo.findOne({email:req.body.email})
        if(chk){
            const ismatch=await bcrypt.compare(req.body.password,chk.password)
            if(ismatch){
                req.session.isAuth=true;
                req.session.loginhid=chk._id
                res.redirect("hospitaldetails")}
                else{
                req.flash('msg','Wrong Password')
                res.redirect("login_hospital")
            }}
            else{
        req.flash('msg','Wrong Username')
        res.redirect("login_hospital")
    }
    }
    catch{
        req.flash('msg','Enter Full details')
        res.redirect("login_hospital")
    }
    

})
//---------------------------------------Home User------------------------------------------


app.get("/home",isAuth,async (req,res)=>{
    res.render("home")
   
})

//-------------------------------------Login User--------------------------------------------


app.get("/login_user",async (req,res)=>{
    res.render("login_user",{message:req.flash('msg')})
})
app.post("/login_user",async (req,res)=>{
    try{
        const chk = await userinfo.findOne({email:req.body.email})
        if(chk){
            const ismatch=await bcrypt.compare(req.body.password,chk.password)
        if(ismatch){
            req.session.loginuid=chk.id;
            console.log()
            req.session.isAuth=true;
            res.redirect("home")}
            else{
                req.flash('msg','Wrong Password')
                res.redirect("login_user")
            }}
            else{
            req.flash('msg','Wrong Username')
        res.redirect("login_user")}
        
        }
        catch{
            req.flash('msg','Enter Details')
            res.redirect("login_user")
        
        }
    
})

//--------------------------------About-Contact-explore---------------------------------------


app.get("/about",async (req,res)=>{
    res.render("about")
})
app.get("/contactUs",async (req,res)=>{
    res.render("contactUs",{message:req.flash('msg')})
})
app.get("/explore",async (req,res)=>{
    res.render("explore")
})
app.get("/hospital",async (req,res)=>{
    res.render("hospital")
})

//-----------------------------------Hospital Home--------------------------------------------


app.get("/hospitaldetails",isAuth,async(req,res)=>{
    console.log(req.session.loginhid)
    res.render("hospitaldetails")
})

//---------------------------------Sign up Hospital--------------------------------------------

app.get("/signup_hospital",async (req,res)=>{
    res.render("signup_hospital",{message:req.flash('msg')})
})


app.post("/signup_hospital", async (req,res)=>{
        try{
            const chk= await hospinfo.findOne({email:req.body.email})
            if(!chk){
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
            req.flash('msg','Re-enter password')
            res.redirect("Signup_hospital")
        }}
        else{
            req.flash('msg','Already Registered')
        res.redirect("signup_hospital")
        }
    }
    catch{
        req.flash('msg','Enter Full details')
        res.redirect("signup_hospital")
    }
}
)

//-------------------------------Sign Up User--------------------------------------------------


app.get("/signup_user",async (req,res)=>{
    res.render("signup_user",{message:req.flash('msg')})
})


app.post("/signup_user", async (req,res)=>{
   try{
    const chk= await userinfo.findOne({email:req.body.email})
    if(!chk){
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
        req.flash('msg','Re-enter Password')
        res.redirect("signup_user")
    }}else{
        req.flash('msg','Already Registered')
    res.redirect("signup_user")
    }
}
catch{
    req.flash('msg','Enter Full details')
    res.redirect("signup_user")
}
})


//---------------------------------Equipment--------------------------------------------------


app.get("/equipments",isAuth,async(req,res)=>{
    equipmentinfo.find({hospitalid:req.session.loginhid}).then((data)=>{
        res.render("equipments",{message:req.flash('msg'),data:data})
    }).catch((y)=>{
console.log(y)
    })
})


app.post("/equipments", async(req,res)=>{
    const newequipmentreg=new equipmentinfo({
        hospitalid:req.session.loginhid,
        instrumentname:req.body.instrumentname,
        type:req.body.type,
        availability:req.body.availability
    })
    await equipmentinfo.insertMany([newequipmentreg])
    req.flash('msg','Successfully Registered')
    res.redirect("equipments")
})


//---------------------------------IcuBeds---------------------------------------------------


app.get("/icubeds",isAuth,async(req,res)=>{
    icubedinfo.find({hospitalid:req.session.loginhid}).then((data)=>{
        res.render("icubeds",{message:req.flash('msg'),data:data})
    }).catch((y)=>{
console.log(y)
    })
})


app.post("/icubeds",async(req,res)=>{
    const newicubedreg=new icubedinfo({
        hospitalid:req.session.loginhid,
        cost:req.body.cost,
        beds:req.body.beds
    })
    await icubedinfo.insertMany([newicubedreg])
    req.flash('msg','Successfully Registered')
    res.redirect("icubeds")
})

//------------------------------Appointment-----------------------------------------------------


app.get("/appointments",isAuth,async(req,res)=>{
    appointmentinfo.find({hospitalid:req.session.loginhid}).then((data)=>{
            res.render("appointments",{message:req.flash('msg'),data:data})
        }).catch((y)=>{
    console.log(y)
        })
})


app.post("/appointments", async(req,res)=>{
    const newappointmentreg=new appointmentinfo({
        hospitalid:req.session.loginhid,
        doctor:req.body.doctor,
        specialist:req.body.specialist,
        cost:req.body.cost,
        yoe:req.body.yoe,
        bookingslot:req.body.bookingslot
    })
    await appointmentinfo.insertMany([newappointmentreg])
    req.flash('msg','Successfully Registered')
    res.redirect("appointments")
})


//-----------------------------------Beds--------------------------------------------------


app.get("/beds",isAuth,async(req,res)=>{
    bedinfo.find({hospitalid:req.session.loginhid}).then((data)=>{
            res.render("beds",{message:req.flash('msg'),data:data})
        }).catch((y)=>{
    console.log(y)
        })
})


app.post("/beds", async(req,res)=>{
    
    const newbedreg=new bedinfo({
        hospitalid:req.session.loginhid,
        publicward:req.body.publicward,
        privateward:req.body.privateward,
        wards:req.body.ward,
        disease:req.body.disease,
    })
    await bedinfo.insertMany([newbedreg])
    req.flash('msg','Successfully Registered')
    res.redirect("beds")
})


//----------------------------------Surgeries-----------------------------------------------


app.get("/surgeries",isAuth,async(req,res)=>{
    surgeryinfo.find({hospitalid:req.session.loginhid}).then((data)=>{
        res.render("surgeries",{message:req.flash('msg'),data:data})
    }).catch((y)=>{
console.log(y)
    })
})


app.post("/surgeries", async(req,res)=>{
    const newsurgeryreg=new surgeryinfo({
        hospitalid:req.session.loginhid,
        doctor:req.body.doctor,
        specialist:req.body.specialist,
        cost:req.body.cost,
        yoe:req.body.yoe,
       
    })
    await surgeryinfo.insertMany([newsurgeryreg])
    req.flash('msg','Successfully Registered')
    res.redirect("surgeries")
})


//-------------------------------Logout Key--------------------------------------------------


app.post("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err)throw err;
        res.redirect("/");
    })
})


//---------------------------------Hosting---------------------------------------------------

app.listen(port,hostname,()=>{
console.log("Server is Running!")
})


