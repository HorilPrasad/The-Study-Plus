const jwt = require('jsonwebtoken');
const admin = require("../models/admin");


const auth = async (req,res,next) =>{
    
    try{
        const token = req.cookies.jwt;
        const verfyUser = jwt.verify(token,process.env.SECRET_KEY)
        console.log(verfyUser)
        const user = await admin.findOne({_id:verfyUser._id});
        req.user = user;
        next();
            
    }catch(error)
    {
        res.status(401).redirect('/admin-login');
    }
    
}

module.exports = auth;