const express = require("express");
const app  = express();
app.use("/hello",(req,res)=>{
    res.send("hello hello!!");
})

app.use("/test",(req,res)=>{
    res.send("hello from server");
})
app.listen(3000, () =>{
    console.log("server is successfully running on port: 3000");
})