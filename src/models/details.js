const mongoose = require("mongoose");

const details = mongoose.Schema({
    brandIconUrl:String,
    heroHeading:String,
    background:String,
    secondTagline:String
})

module.exports = mongoose.model("detail",details);
