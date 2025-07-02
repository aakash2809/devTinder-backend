const express = require("express");
const app  = express();

//app.use("routes",[rh1,rh2],rh3,rh4)

//use --> accepts all http methods
app.use("/user",(req,res,next)=>{
    console.log("first reponse handler")
    res.status(200).send('success')
})

app.use("/admin",(req,res,next)=>{
    console.log("inside midleware")
    let token = "xyz"
    let isAuthorized = token === "xyz"
    if(isAuthorized){
        next();
    }else{
        res.status(401).send('you are not authorized')
    }   
})

app.get("/admin/getAlldata",(req,res,next)=>{
     console.log("all data is here")
     res.status(200).send('all data is here')
})

app.get("/admin/getAlldata/delete",(req,res,next)=>{
    console.log("data have deleted")
    res.status(401).send('data have deleted')
})
app.listen(3000, () =>{
    console.log("server is successfully running on port: 3000");
})