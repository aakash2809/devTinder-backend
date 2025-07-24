const validator =  require('validator')
const validateSignUpData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error('Name is not valid')
    }

    if(firstName.length < 4 || firstName.length > 50) {
        throw new Error('First name should be 4 to 50 character')
    }
     if(!validator.isEmail(emailId)){
        throw new Error('Email Id is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw new Error('Weak password')
    }   
}

module.exports = {validateSignUpData}

