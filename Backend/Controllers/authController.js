const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../Models/UserModel');
const { json } = require('express');

const authController={
    registerUser:async (req,res)=>{
    try{

    
    const{userName,email,password}=req.body;

    const existingUser=await User.findOne({email});
    if(existingUser)
        return res.status(400).json({message:"User already registered before"});

    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await User.create({
        userName,
        email,
        password:hashedPassword
    });
    const{
        password: _,
        ...userWithoutSensetiveData
    }=newUser.toObject();
    
    return res.status(201).json({
        message:"User registered successfully",
        user:userWithoutSensetiveData
    });
}

    catch(error){
        console.error("Register error:", error);  // 👈 Add this line
  return res.status(500).json({message:"Registeration failed"});
    }
    }
    ,loginUser:async(req,res)=>{
        try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
            return res.status(404).json({message:"User not found"});
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(!passwordMatch)
            return res.status(401).json({message:"Incorrect email or password"});
        const currTime=new Date();
        const expiresAt=new Date(+currTime+60*60*1000);
        const token = jwt.sign(
  { id: user._id, email: user.email }, 
  process.env.SECRET_KEY, 
  { expiresIn: '1h' }
);
        const {
            password:_,
            ...userWithoutSensetiveData
        }=user.toObject();
    return res.cookie("token",token,{
        expires:expiresAt,
        httpOnly:true,
        sameSite:"lax",
        secure:false
    }).status(200).json({
        message:"Login successfully",
        user:userWithoutSensetiveData
    });
}
catch(error){
return res.status(500).json({message:error.message});
}

    },
    logoutUser:async(req,res)=>{
        try{res.clearCookie("token");
       return res.status(200).json({message:"logout successful"});
        }
        catch(error){
            return res.status(500).json({message:error.message});
        }
    }
}
module.exports=authController