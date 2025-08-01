const mongoose = require("mongoose");

const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://aakash2809:System123@namastenode.eesjxfi.mongodb.net/devTinder")
}

module.exports =  { connectDb }
