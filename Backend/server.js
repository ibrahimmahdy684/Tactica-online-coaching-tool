require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB=require('./config/db')
const authRouter=require('./Routers/authRouter');
const playerRouter=require('./Routers/playerRouter');
const cookieParser = require('cookie-parser');

const app=express();

app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true,               // allow cookies/auth headers
}));
app.use(express.json());
app.use(cookieParser());
connectDB();
app.use('/api/v1',authRouter);
app.use('/api/v1',playerRouter);
const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});