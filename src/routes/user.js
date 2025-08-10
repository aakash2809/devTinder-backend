const express = require('express');
const userRouter = express.Router();
const userAuth = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest')
const USER_SAFE_DATA = 'firstName lastName age photoUrl about skills'

userRouter.get('/user/requests/recieved', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: 'interested'
        }).populate('fromUserId', USER_SAFE_DATA)
        //}).populate('fromUserId', ['firstName','lastName'])

        if (!connections || connections?.length == 0) {
            return res.status(200).json('no connections are available')
        }

        res.status(200).json({ connections: connections })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: 'accepted' },
                { fromUserId: loggedInUser._id, status: 'accepted' }
            ]
        }).populate('fromUserId', USER_SAFE_DATA)
            .populate('toUserId', USER_SAFE_DATA)
        //}).populate('fromUserId', ['firstName','lastName'])

        if (!connections || connections?.length == 0) {
            return res.status(200).json('no connections are available')
        }

        const data = connections.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.status(200).json({ connections: data })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

module.exports = userRouter