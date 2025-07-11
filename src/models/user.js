const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address" +value)
            }
        }
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("your password is not strong " +value)
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    photoUrl:{
        type: String,
        default:'https://pngtree.com/freepng/users-vector_3725294.html'
    },
    gender: {
        type: String,
        validate(value){
            if(!['male', 'female', 'other'].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    about:{
        type:String
    },
    skills:{
        type: [String],
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)