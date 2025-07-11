const mongoose = require('mongoose');

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
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    imageURL:{
        type: String,
        default:'https://pngtree.com/freepng/users-vector_3725294.html'
    },
    gender: {
        type: String,
        required:true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)