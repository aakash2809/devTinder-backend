const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    lastName: {
        type: String
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(values) {
            if (!['male', 'female', 'others'].includes(values)) {
                throw new error('Gender data is not valid')
            }
        }
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        default: 'https://archive.org/details/instagram-plain-round/instagram%20plain%20round.jpg'
    },
    about: {
        type: String,
        default: 'this is a default information of the user'
    },
    skills: {
        type: [String]
    },
}, { timestamps: true })


module.exports = mongoose.model("User", userSchema)