const express = require("express");
const app  = express();


//use --> accepts all http methods
app.use("/test",(req,res)=>{
    res.send("hello from server");
})

app.get("/user/:id/:name", (req, res)=>{
    console.log(Object.assign({},req.params))
    console.log(Object.assign({}, req.query))
    res.send({"firstName":"aakash", "lastName": "Rajak"})
})

app.listen(3000, () =>{
    console.log("server is successfully running on port: 3000");
})