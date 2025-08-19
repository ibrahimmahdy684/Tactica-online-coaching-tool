const mongoose=require('mongoose');
const playerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    position:{
        type:String,
        enum:["GK","DEF","MID","ATT"],
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    pace:{
        type:Number,
        
    },
    shooting:{
        type:Number,
        
    },
    defense:{
        type:Number,
        
    },
    passing:{
        type:Number,
        
    },
    physical:{
        type:Number,
        
    },
    diving:{
        type:Number,
    },
    reflexes:{
        type:Number,
    },
    handling:{
        type:Number,
    },
    positioning:{
        type:Number,
    },
    kicking:{
        type:Number,
    },
    image:{
        type:String
    },
    coach:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true});
const Player=mongoose.model("Player",playerSchema);
module.exports=Player;