const playerModel=require('../Models/PlayerModel');
const { findByIdAndUpdate, findByIdAndDelete } = require('../Models/UserModel');
const playerController={
    createPlayer:async (req,res)=>{
    try{
        const{
            name,
            position,
            rating,
            pace,
            shooting,
            defense,
            passing,
            physical,
            diving,
            reflexes,
            handling,
            positioning,
            kicking,
            image,
            number
        }=req.body;
        const newPlayer=new playerModel({
             name,
            position,
            rating,
            pace,
            shooting,
            defense,
            passing,
            physical,
            diving,
            reflexes,
            handling,
            positioning,
            kicking,
            image,
            number
        });
        await newPlayer.save();
        return res.status(201).json({message:"Player created successfully"});
    }
    
    catch(error){
    return res.status(500).json({message:error.message});
    }
},
getPlayers:async(req,res)=>{
    try{
        const players=await playerModel.find();
        return res.status(200).json(players);
    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
},
getSpecificPlayer:async(req,res)=>{
    try{
        const player=await playerModel.findById(req.params.id);
        if(!player)
            return res.status(404).json({message:"player not found"});
        return res.status(200).json(player);
    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
},
getCurrentUserPlayers:async(req,res)=>{
try{
    const player=await playerModel.find({coach:req.user._id});
    return res.status(200).json(player);
}
catch(error){
   return res.status(500).json({message:error.message});
}
},
updatePlayer:async(req,res)=>{
    try{const updates=req.body;
    const updatedPlayer=await playerModel.findByIdAndUpdate(req.params.id,updates,{new:true});
    if(!updatedPlayer)
        return res.status(404).json({message:"player not found"});
    return res.status(200).json(updatedPlayer);
    }
    
    catch(error){
        return res.status(500).json({message:error.message});
    }
},
deletePlayer:async(req,res)=>{
    try{
        const player=await playerModel.findByIdAndDelete(req.params.id);
        if(!player)
            return res.status(404).json({message:"Player not found"});
        return res.status(204).json({message:"player deleted successfully"});
    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
},
getTopPlayers:async(req,res)=>{
try{
        const players=await playerModel.find().sort({rating:-1}).limit(4);
        return res.status(200).json(players);
    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
}
}
module.exports=playerController;