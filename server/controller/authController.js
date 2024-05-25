const User = require('../models/UserModel');
const {createSecretToken} = require('../util/SecretToken');
const bcrypt = require('bcrypt');

const signup =  async (req, res)=>{
    try{
        const { email, password, username} = req.body;

        const existingemail = await User.findOne({ email });
        const existingUser = await User.findOne({ username });

        if(existingUser){
            res.status(200).json({message: "username already exists", success: false});
        }else if(existingemail){
            res.status(200).json({message: "email already exists", success: false});
        }else{

            const user = await User.create({ email, password, username});
            res.status(201).json({message : "user added successfully", success: true, user});

        }
    }catch(error){
        res.status(500).json({message: "error occured!"});
        console.error(error);
    }
    

}

const login = async (req, res)=>{
    try{
       const {password, username} = req.body;

        // console.log(password, username);
        
       const user = await User.findOne({ username });

       if(!user){
        return res.status(200).json({message: "invalid username", success: false});
       }

       const auth = await bcrypt.compare(password,user.password);

       if (!auth) {
        return res.status(200).json({message:'Incorrect password', success: false}); 
      }

      const token = createSecretToken(user._id);

      res.status(200).json({ message: "User logged in successfully", success: true, token});
        
    }catch(error){
        console.log(error);
        res.status(500).json({message : "server error"});
    }
}





module.exports = {signup, login};