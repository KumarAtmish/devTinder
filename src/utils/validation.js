const validator = require('validator');

const validationSignup = (req) =>{
    const {firstName, emailId, password } = req.body;
    if(!firstName){
        throw new Error('Name is not valid')
    } else if(!validator.isEmail(emailId)){
        throw new Error('Enter a valid email')
    } else if(!validator.isStrongPassword(password)){
        throw new Error('Please enter a strong password')
    }
}

module.exports = {validationSignup}