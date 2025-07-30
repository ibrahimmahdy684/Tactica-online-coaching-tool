const { Timestamp } = require('bson');
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
   },
   email:{
    type:String,
   },
   password:{
    type:Number,
    required:true,
    minLength:8
   },
   
},{timestamps:true});
const User=mongoose.model("user",userSchema);
module.exports=User;