const mongoose=require('mongoose');
const url=process.env.MONGODB_URL;

const connectDB=async()=>{
    try{
    await mongoose.connect(url);
    console.log("db connected");
    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
};
module.exports=connectDB;