const express = require('express');
const userRouter = express.Router();
const userAuth = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user')
const USER_SAFE_DATA = 'firstName lastName age photoUrl about skills gender'

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

userRouter.get('/user/feed', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        let limit = parseInt(req.query.limit) || 10;
        const page =  parseInt(req.query.page ) || 1 ;
        const skip = ( page - 1 ) * limit;
        limit = limit > 50 ? 50 : limit; 

        const connectionRequest = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
        }).select("fromUserId toUserId")

        const hideUserFromFeed = new Set()

        connectionRequest.forEach(req => {
            hideUserFromFeed.add(req.fromUserId.toString())
            hideUserFromFeed.add(req.toUserId.toString())
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

    res.send(users)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = userRouter

