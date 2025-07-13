const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const { validationSignup } = require('../utils/validation')
const authRouter = express.Router()

authRouter.post("/signup", async(req, res) => {
    try{
        // Validation of data
        validationSignup(req)
        
        const { firstName, lastName, emailId, password } = req.body
        //Encrypt the password
        const passwordEncrypt = await bcrypt.hash(password, 10)

        // Create a new instance or the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordEncrypt
        })

        await user.save();
        res.status(200).send('User added successfully')
    } catch(err){
        res.status(400).send('ERROR : ' + err.message)
    }
});

authRouter.post('/login', async(req, res) =>{
    try{
        const {emailId, password} = req.body

        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error('Invalid credentials')
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if(passwordValid){
            // Creating the token and inside that send the user id and adding the secret key
            let token = jwt.sign({ _id: user._id }, 'Dev@Tider$789', { expiresIn: '7d' });

            // Add the token to the cookie and send the response to the user
            res.cookie("token",token)

            res.status(200).send('Login Successfull !!')
        }else{
            throw new Error('Invalid credentials')
        }
    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

module.exports = authRouter