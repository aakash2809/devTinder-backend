const mongoose =  require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type:String,
        required: true,
        enum:{
            values: ["ignored", "interested", "rejected", "accepted" ],
            message:`{values} is incorrecy status type`
        }
    }
},
{ timestamps: true }
);

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this
    //check if fromUserId and toUserId is same
    if(connectionRequest.fromUserId.equals(this.toUserId)) {
        throw new Error("cannot send connection request to yourself")
    }
   next();
})
const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequest