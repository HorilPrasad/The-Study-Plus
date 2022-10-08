const mongoose = require("mongoose");

// Admin details Schema
const admin = mongoose.Schema({
    email:String,
    name:String,
    post:String,
    password:String,
    tokens:[{
        token:String
    }
    ]
})

module.exports = mongoose.model("admin",admin);