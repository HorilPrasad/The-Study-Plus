const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const app = express();
const detail = require("./models/details");
const teacher = require("./models/teachers");
const pendingteacher = require("./models/pendingteachers");
const async = require("hbs/lib/async");
const {sentmailTeacher, sendmailStudent} = require("./mail/mailer");

// use public folder as static
app.use('/static',express.static("public"));


// use json for data parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Handlebars as a view engine
app.set('view engine','hbs');
app.set("views","views");
hbs.registerPartials("views/partials");

// redirect home page
app.get("/",async (req,res) => {
    const details = await detail.findOne({"_id":"628bb2081104845f9dc95da9"});
     const teachers = await teacher.find();
    res.render("index",{
         details:details,
         teachers:teachers
    })

});


app.get("/register",async(req,res) => {
     const details = await detail.findOne({"_id":"628bb2081104845f9dc95da9"})
    res.render("register",{
        details:details
    })
});

app.get("/contact/:id", async (req,res) => {
    const details = await detail.findOne({"_id":"628bb2081104845f9dc95da9"})
    const data = await teacher.findOne({"_id":req.params.id});
    res.render("contact",{
        data:data,
        details:details
    })


});




app.get("/admin", async (req,res) => {
    const details = await detail.findOne({"_id":"628bb2081104845f9dc95da9"})
    res.render("login",{
        details:details
    });
});

// mongodb connection
 mongoose.connect("mongodb://localhost/thestudyplus",() =>{
    // detail.create({
    //     brandIconUrl:"/static/images/logo.png"
    // })
   });

app.post("/contact/:id",async(req,res) =>{
    const data = await teacher.findOne({"_id":req.params.id});
    let obj = {
        name:data.name,
        email:data.email,
        phone:data.phoneNumber,
        qualification:data.qualification
    }
    let student = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phoneNumber,
        qualification:req.body.qualification,
        address:req.body.address,
        gender:req.body.gender,
        message:req.body.message
    }
    sendmailStudent(req.body.email,obj);
    sentmailTeacher(data.email,student);
   return  res.redirect("/");
});


app.post("/register",async (req,res)=>{
 try {
    //  add teacher details to database
     teacher.create({
                name:req.body.name,
                imageUrl:req.body.imageUrl,
                qualification:req.body.qualification,
                from:req.body.college,
                expertise:[
                    {subject:req.body.experience1},
                    {subject:req.body.experience2},
                    {subject:req.body.experience3},
                    {subject:req.body.experience4}
                ],
                email:req.body.email,
                phoneNumber:req.body.phoneNumber,
                address:req.body.address,
                gender:req.body.gender,
                dob:req.body.dob
            })
           

 } catch (error) {
     res.status(400).send(error);
 }  

 return res.redirect('/');
});

// server setup
app.listen(process.env.PORT | 8080,()=>{
    console.log("server started");
});