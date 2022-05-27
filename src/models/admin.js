const mongoose = require("mongoose");

// Admin details Schema
const admin = mongoose.Schema({
    email:String,
    password:String,
    name:String
})

module.exports = mongoose.model("admin",admin);