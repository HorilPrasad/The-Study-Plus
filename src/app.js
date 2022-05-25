const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const app = express();
const detail = require("./models/details");
const teacher = require("./models/teachers");
const async = require("hbs/lib/async");


app.use('/static',express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','hbs');
app.set("views","views");
hbs.registerPartials("views/partials");

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

mongoose.connect("mongodb://localhost/thestudyplus",() =>{
    console.log("db connected");
    // teacher.create({
    //     name:"Horil Prasad",
    //     imageUrl:"https://www.careergirls.org/wp-content/uploads/2018/05/Teacher_1920x1080.jpg",
    //     qualification:"MCA",
    //     from:"NIT Allahabad",
    //     expertise:[
    //         {subject:"12th math"},
    //         {subject:"Android Development"},
    //         {subject:"Web Development"},
    //         {subject:"NodeJS, Express, MongoDB"}
    //     ]   
    // })
    // detail.create({
    //     brandIconUrl:"/static/images/logo.png"
    // })
});
app.post("/contact/:id",async(req,res) =>{

});


app.post("/register",async (req,res)=>{
 try {
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

app.listen(process.env.PORT | 8080,()=>{
    console.log("server started");
});