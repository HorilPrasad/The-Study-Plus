const mongoose = require("mongoose");

const pendingteachers = mongoose.Schema({
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

module.exports = mongoose.model("pendingteacher",pendingteachers);