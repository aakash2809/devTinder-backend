const validator = require('validator')
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error('Name is not valid')
    }

    if (firstName.length < 4 || firstName.length > 50) {
        throw new Error('First name should be 4 to 50 character')
    }
    if (!validator.isEmail(emailId)) {
        throw new Error('Email Id is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Weak password')
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ['firstName', 'lastName', 'emailId', 'photoUrl', 'skills', 'gender', 'age','about']
    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field))
    return isEditAllowed;
}

const validateNewPassword= (req) =>{
const { newPassword, confirmPassword }  = req.body
if(!validator.isStrongPassword(newPassword)) {
    throw new Error('new password is a weak password')
}

if(newPassword != confirmPassword){
    throw new Error('newPassword and confirmPassword should be equal')
}

}
module.exports = { validateSignUpData, validateEditProfileData, validateNewPassword }

