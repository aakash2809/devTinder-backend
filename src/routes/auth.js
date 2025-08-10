const express =  require('express')
const authRouter =  express.Router();
const User = require('../models/user')
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');

authRouter.post('/signUp', async (req, res) => {
    try {
        //creating a new instance of a user model
        const { firstName, lastName, emailId, password, skills, age, photoUrl } = req.body
        //validation of data
        validateSignUpData(req)
        //Encription of password
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({ firstName, lastName, skills, age, photoUrl, emailId, password: hashPassword })
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

authRouter.post('/login', async (req, res) => {
    try {
        //creating a new instance of a user model
        const { emailId, password } = req.body

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error('Invalid credentials')
        }

        //validate the password, generate the token and save it to cookie
        const isValidPassword = await user.validatePassword(password)
        if (isValidPassword) {
            const token = await user.getJWT();
            res.cookie('token', token, {expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
            res.status(200).send('login successfull')
        }
        else {
            throw new Error('Invalid credentials')
        }
    } catch (err) {
        res.status(400).send(
            {
                error: true,
                message: err.message
            })
    }
})

authRouter.post('/logout', async (req, res) => {
    res.cookie('token', null,{
        expires: new Date(Date.now())
    })

    res.send('logout successfully')
})

module.exports = authRouter;

