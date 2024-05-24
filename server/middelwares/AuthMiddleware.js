const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userVerification = (req, res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success: false});
    }
    jwt.verify(token, process.env.TOKEN_KEY, async(err, data)=>{
        if(err){
            res.status(500).json({message: "error in server"});
        }else{
            const user = await User.findById(data.id);
            if (user) return res.status(200).json({ success: true, user: user.username });
            else res.status(401).json({success: false});
        }
    })
}

module.exports = { userVerification };