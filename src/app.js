const express = require("express");
const app  = express();

//app.use(user,[rh1,rh2],rh3,rh4)

//use --> accepts all http methods
app.use("/user",(req,res,next)=>{
    console.log("first reponse handler")
      next();
 
}, [(req,res,next)=>{
    console.log("second reponse handler")
    next();
},
(req,res,next)=>{
    console.log("third reponse handler")
   next()
}],
(req,res,next)=>{
    console.log("forth reponse handler")
    res.send("response4 !");
})

app.listen(3000, () =>{
    console.log("server is successfully running on port: 3000");
})