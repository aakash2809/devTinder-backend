const express = require("express");
const app  = express();
const { adminAuth, userAuth } = require("./middlewares/auth")

//use --> accepts all http methods
app.use("/user", userAuth, (req,res)=>{
    console.log("first reponse handler")
    res.status(200).send('success')
})

app.use("/admin", adminAuth)

app.get("/admin/getAlldata",(req,res,next)=>{
     console.log("all data is here")
     res.status(200).send('all data is here')
})

app.get("/admin/getAlldata/delete",(req,res,next)=>{
    console.log("data have deleted")
    res.status(200).send('data have deleted')
})
app.listen(3000, () =>{
    console.log("server is successfully running on port: 3000");
})