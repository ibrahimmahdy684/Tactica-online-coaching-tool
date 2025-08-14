const mongoose=require('mongoose');
const playerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    position:{
        type:String,
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
    }
},{timestamps:true});
const Player=mongoose.model("Player",playerSchema);
module.exports=Player;