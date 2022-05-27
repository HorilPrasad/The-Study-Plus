const mongoose = require("mongoose");


//website home page schema
const details = mongoose.Schema({
    brandIconUrl:String,
    heroHeading:String,
    background:String,
    secondTagline:String
})

module.exports = mongoose.model("detail",details);