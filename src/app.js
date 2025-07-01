const express = require("express");
const app  = express();


//use --> accepts all http methods
app.use("/test",(req,res)=>{
    res.send("hello from server");
})

app.get("/user", (req, res)=>{
    res.send({"firstName":"aakash", "lastName": "Rajak"})
})

app.post("/user", (req,res)=>{
    //saving data to db logic
    res.send("data has been saved successfully");
})

app.delete("/user", (req,res)=>{
    //delete data from db logic
    res.send("data has been deted successfully");
})

app.listen(3000, () =>{
    console.log("server is successfully running on port: 3000");
})