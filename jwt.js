const jwt=require('jsonwebtoken');


const jwtAuthMiddleware=(req,res,next)=>{

    //first check request header has authorization or not
    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error:'token not found'});

    //extract the jwt token from the request headers
    const token=req.headers.authorization.split('Bearer ')[1];
    if(!token) return res.status(401).json({error:'unauthorized'});

    try{
        //verify the jwt token

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //attach user information to the request object
        req.user=decoded
        //here user is variable ,we can use anything here
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:'invalid token'});
    }
}

// function to genarate JWT token
const genarateToken=(userData)=>{
    //genarate a new token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000});
}
module.exports={jwtAuthMiddleware,genarateToken};