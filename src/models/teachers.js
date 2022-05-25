const mongoose = require("mongoose");

const teachers = mongoose.Schema({
    name:String,
    imageUrl:String,
    qualification:String,
    from:String,
    expertise:[{
        subject:String
    }],
    email:String,
    phoneNumber:Number,
    address:String,
    dob:String,
    gender:String
})

module.exports = mongoose.model("teacher",teachers);