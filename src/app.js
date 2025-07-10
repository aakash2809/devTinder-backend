const express = require("express");
const app  = express();
const { connnectDb } = require("./config/database");
const User =  require('./models/user')

app.use(express.json())

app.post('/signUp', async(req,res) =>{
    console.log(req.body);

    const { firstName, lastName, age, gender, emailId, password} = req.body;
    
    //creating a new instance of a user model
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        emailId: emailId,
        password: password
    })

    // const user = new User({
    //     firstName: 'Aakash',
    //     lastName: 'rajak',
    //     gender: 'Male',
    //     emailId: 'aakash@gmail.com',
    //     password: 'sdfdsfsd'
    // })
    try{
        await user.save()
        res.status(200).send('User added successfully')

    }catch(err){
         res.status(400).send('error while adding the user to database')
    }
})

connnectDb().then(()=>{
    console.log("database connetion stablished")
    app.listen(3000, () =>{
    console.log("server is successfully running on port: 3000");
})

}).catch((err)=>{
    console.error("database can not be connected")
})

