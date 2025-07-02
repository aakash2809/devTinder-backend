const express = require("express");
const app  = express();
const { adminAuth, userAuth } = require("./middlewares/auth")

//use --> accepts all http methods
app.get("/user",(req,res)=>{
    try {
        throw new Error("error")
        res.status(200).send('success')
    }catch(err){
        res.status(500).send('some error occured contact support team')
    }  
})

app.use('/',(err, req, res, next00) =>{
    if(err) {
        res.status(500).send("something went wrong")
    }
})

app.listen(3000, () =>{
    console.log("server is successfully running on port: 3000");
})