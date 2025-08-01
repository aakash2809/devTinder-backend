const jwt = require('jsonwebtoken')
const User = require('../models/user')
const userAuth = async(req,res,next) =>{
    try{  const cookie = req.cookies;
   const {token} = cookie;
   if(!token){
    throw new Error('Invalid token')
   }
   decodedMessage = await jwt.verify(token, 'secretKey')
   const  {_id } = decodedMessage;
    const user = await User.findById(_id);
    if(!user){
        throw new Error('user not found')
    }
    req.user = user;
    next();
}
   catch(err){
    res.status(400).send(err.message)
   }
 

 } 

 module.exports = userAuth 
 
