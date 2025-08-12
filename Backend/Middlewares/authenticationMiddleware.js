const jwt=require('jsonwebtoken');
function authenticateUser(req,res,next){
    const cookie=req.cookies;
    if(!cookie)
        return res.status(401).json({message:"no cookie provided"});
        
    const token=cookie.token;
    if(!token)
        return res.status(401).json({message:"no token provided"});

    try{
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        req.user=decoded;
        next();
    }
    catch(error){
        return res.status(403).json({message:"invalid token"});
    }
}

module.exports=authenticateUser;