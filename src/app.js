const express = require("express");
const app  = express();
const { connnectDb } = require("./config/database")


connnectDb().then(()=>{
    console.log("database connetion stablished")
    app.listen(3000, () =>{
    console.log("server is successfully running on port: 3000");
})

}).catch((err)=>{
    console.error("database can not be connected")
})

