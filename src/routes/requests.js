const express = require('express')
const requestRouter = express.Router();
const userAuth = require('../middlewares/auth');

// requestRouter.post('/request/send/intrested/:userId', (req,res)=>{

// })

requestRouter.post('/sendConnectionRequest',userAuth, (req, res)=>{
    const user = req.user 
    res.send(user.firstName + ' sent a connection request')
})

module.exports = requestRouter;