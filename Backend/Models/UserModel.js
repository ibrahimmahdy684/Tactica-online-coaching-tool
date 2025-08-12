const { Timestamp } = require('bson');
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
   },
   email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true
},

   password:{
    type:String,
    required:true,
    minLength:8
   },
   
},{timestamps:true});
const User=mongoose.model("User",userSchema);
module.exports=User;