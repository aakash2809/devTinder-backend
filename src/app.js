const express = require("express");
const app = express();
const { connnectDb } = require("./config/database");
const User = require('./models/user')

app.use(express.json())

app.post('/signUp', async (req, res) => {
    //creating a new instance of a user model
    const user = new User(req.body)
    try {
        await user.save()
        res.status(200).send('User added successfully')

    } catch (err) {

        res.status(400).send(
            {
                error: true,
                message: err.message
            })
    }
})


//get api to fetch user by email id
app.get('/user', async (req, res) => {
    let emailId = req.body.emailId
    console.log(req.body.emailId)
    try {
        let users = await User.find({ emailId: emailId })
        if (users.length === 0) {
            res.status(404).send('user not found')
        } else {
            res.status(200).send(users)
        }

    } catch (err) {
        res.status(400).send('something went wrong')
    }
})
//feed API get all users from db
app.get('/feed', async (req, res) => {
    try {
        let users = await User.find({})
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send('something went wrong')
    }
})

//delete API to delete a user from db
app.delete('/user/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send('user has been deleted successfully')
    } catch (err) {
        res.status(400).send('something went wrong')
    }
})

app.patch('/user/update/:id', async (req, res) => {
    try {
       let UPDATE_ALLOWED = ['photoUrl','about','skills',"age"];
       let data = req.body;
       let isupdateAllowed =  Object.keys(data).every((k)=> UPDATE_ALLOWED.includes(k));
       if(!isupdateAllowed){
        throw new Error('update not allowed')
       }

       if(data?.skills.length > 10){
        throw new Error('more than ten skills are not allowed')
       }
        let responseData = await User.findByIdAndUpdate(
            { _id: req.params.id },
            data,
            {
                returnDocument: "after",
                runValidators: true
            })
        res.status(200).send('user has been updated successfully', responseData)
    } catch (err) {
        res.status(400).send('something went wrong '+ err)
    }
})

connnectDb().then(() => {
    console.log("database connetion stablished")
    app.listen(3000, () => {
        console.log("server is successfully running on port: 3000");
    })

}).catch((err) => {
    console.error("database can not be connected")
})

