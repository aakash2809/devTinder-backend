const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

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
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid emailid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Enter the strong password')
            }
        }
    },
    photoUrl: {
        type: String,
        default: 'https://archive.org/details/instagram-plain-round/instagram%20plain%20round.jpg',
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Invalid PHOTO URL' + value)
            }
        }
    },
    about: {
        type: String,
        default: 'this is a default information of the user'
    },
    skills: {
        type: [String]
    },
}, { timestamps: true })

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "secretKey", {
        expiresIn: '7d'
    });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const hashPassword = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashPassword)
    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema)