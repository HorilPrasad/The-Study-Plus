const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const app = express();
const detail = require("./models/details");
const teacher = require("./models/teachers");
const pendingteacher = require("./models/pendingteachers");
const async = require("hbs/lib/async");
const { sentmailTeacher, sendmailStudent } = require("./mail/mailer");
const admin = require("./models/admin");
require('dotenv').config();
const cookieParser = require('cookie-parser')
const auth = require('./middleware/auth');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
//use public folder as static path
app.use('/static', express.static("public"));

// use json for data parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Handlebars as a view engine
app.set('view engine', 'hbs');
app.set("views", "views");
hbs.registerPartials("views/partials");

// redirect home page
app.get("/", async (req, res) => {
    const details = await detail.findOne({ "_id": "630b378829fb0b9c05029c32" });
    const teachers = await teacher.find();
    res.render("index", {
        details: details,
        teachers: teachers
    })

});

app.get("/register",async (req, res) => {
    const details = await detail.findOne({ "_id": "630b378829fb0b9c05029c32" });

    res.render("register", {
        details: details
    })
});

app.get("/contact/:id", async (req, res) => {
    const details = await detail.findOne({ "_id": "630b378829fb0b9c05029c32" });
    const data = await teacher.findOne({ "_id": req.params.id });
    res.render("contact", {
        data: data,
        details: details
    })


});

app.get('/admin-dashboard',auth, (req,res) => {
    const user = req.user;
    res.render("dashboard",{user});

})

app.get("/admin-login", async (req, res) => {
    const details = await detail.findOne({ "_id": "630b378829fb0b9c05029c32" })
    console.log(details.heroHeading)
    res.render("login", {
        details: details
    });
});

// mongodb connection
mongoose.connect(process.env.DB_CONN, () => {
    console.log('DB connected')
});

app.post("/contact/:id", async (req, res) => {
    const data = await teacher.findOne({ "_id": req.params.id });
    let obj = {
        name: data.name,
        email: data.email,
        phone: data.phoneNumber,
        qualification: data.qualification
    }
    let student = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phoneNumber,
        qualification: req.body.qualification,
        address: req.body.address,
        gender: req.body.gender,
        message: req.body.message
    }
    sendmailStudent(req.body.email, obj);
    sentmailTeacher(data.email, student);
    return res.redirect("/");
});


app.post("/register", async (req, res) => {
    try {
        //  add teacher details to database
        teacher.create({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            qualification: req.body.qualification,
            from: req.body.college,
            expertise: [
                { subject: req.body.experience1 },
                { subject: req.body.experience2 },
                { subject: req.body.experience3 },
                { subject: req.body.experience4 }
            ],
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            gender: req.body.gender,
            dob: req.body.dob
        })


    } catch (error) {
        res.status(400).send(error);
    }

    return res.redirect('/');
});

app.post('/admin-login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await admin.findOne({ email: email });

        if (user && user.password === password) {
            const token = jwt.sign(
                {_id:user._id, email },
                process.env.SECRET_KEY,
                {
                    expiresIn: "2h"
                }
            );

            user.tokens = user.tokens.concat({token});
            await user.save();
            res.cookie("jwt", token).status(200);
            // , {
            //     expires: new Date(Date.now() + 500000)
            // }
            res.redirect('/admin-dashboard')
        } else {
            
            res.status(400).send("Invalid User");
            
        }


        // const salt = bcrypt.genSaltSync(saltRounds);

        // const hashPassword = bcrypt.hashSync(password,salt);
        // console.log(hashPassword);



    } catch (error) {
        res.status(400).send(error)
    }
});

// server setup
app.listen(process.env.PORT, () => {
    console.log("server started");
});


module.exports = app;