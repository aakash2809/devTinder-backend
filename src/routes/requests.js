const express = require('express');
const mongoose = require('mongoose');
const requestRouter = express.Router();
const userAuth = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user')

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
    
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const allowedStatus = ['interested', 'ignored']
        if (!allowedStatus.includes(status)) {
            return res.status(400).send('invalid status')
        }

         //  Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(fromUserId) || !mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).json({ message: 'Invalid user ID provided.' });
        }

        const toUser = await User.findById(toUserId)
        if(!toUser){
            return res.status(404).send({message: `User not found!`})
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId, }
            ]
        });
        if (existingConnectionRequest) {
             console.log(existingConnectionRequest);
            return res.status(400).json({ message: 'connection Request is already available' })
        }

        const data = await connectionRequest.save();
        
         // Generate proper message
        let message = '';
        if (status === 'interested') {
            message = `${req.user.firstName} is interested in ${toUser.firstName}.`;
        } else if (status === 'ignored') {
            message = `${req.user.firstName} has ignored ${toUser.firstName}.`;
        }

        res.json({
            status: 200,
            message: message,
            data: data

        })
    } catch (err) {
        res.json({
            status: 400,
            error: err.message
        })
    }
})

requestRouter.post('/sendConnectionRequest', userAuth, (req, res) => {
    const user = req.user
    res.send(user.firstName + ' sent a connection request')
})

module.exports = requestRouter;