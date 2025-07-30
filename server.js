require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB=require('./config/db')


const app=express();

app.use(cors());
app.use(express.json());

connectDB();

const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});