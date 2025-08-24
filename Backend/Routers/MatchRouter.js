const simulate=require('../Controllers/MatchController');
const authenticateUser=require('../Middlewares/authenticationMiddleware');
const express=require('express');
const router=express.Router();

router.post("/match",simulate);

module.exports=router;