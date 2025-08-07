const express =  require('express')
const profileRouter =  express.Router();
const userAuth = require('../middlewares/auth');
const { validateEditProfileData, validateNewPassword } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
       const user = req.user
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try{
       if (!validateEditProfileData(req)) {
        throw new Error('validation failed')
       }

       const loggedInUser = req.user
       //const updateUser =  await User.findByIdAndUpdate(user._id.toString(), req.body,  { returnDocument: 'after'} )
       Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key])
       console.log(loggedInUser)
       await loggedInUser.save()
    //    res.send(`${loggedInUser.firstName} your profile updated successfully`)
       res.json({message: `${loggedInUser.firstName} your profile updated successfully`, data: loggedInUser })
    }catch(err){
        res.status(400).send(err.message)
    }
})

profileRouter.patch('/profile/password', userAuth, async (req, res) => {
    try{
       validateNewPassword(req)

        const hashPassword = await bcrypt.hash(req.body.newPassword, 10)
        Object.keys(req.body).forEach((key) => {
            if(key === "password"){
                req.user[key] = hashPassword
            }
        })

        await req.user.save()
        res.json({status: 200, message: 'password updated successfully'})
       
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = profileRouter;