


const adminAuth = (req,res,next) =>{
    console.log("admin midleware")
    let token = "xy"
    let isAuthorized = token === "xyz"
    if(!isAuthorized){
        res.status(401).send('you are not authorized');
    }else{
        next();  
    } 
 } 

 const userAuth = (req,res,next) =>{
    console.log("user midleware")
    let token = "xy"
    let isAuthorized = token === "xyz"
    if(!isAuthorized){
        res.status(401).send('unauthorized requiest');
    }else{
        next();  
    } 
 } 

 module.exports = {
     adminAuth,
     userAuth 
 }
