const jwt = require('jsonwebtoken')

const User = require('../models/user')

const authUser = async (req, res, next) => {
    try{
        //Read the token from the req cookies
        const { token } = req.cookies;
        
        //Validate the token
        if(!token){
            throw new Error('Token is not available')   
        }

        // verify a token and the secret key
        let decodeMessage = await jwt.verify(token, 'Dev@Tider$789')

        const { _id } = decodeMessage
        //Find the user

        let user = await User.findById(_id)
    
        if(!user){
            throw new Error("User not found")
        }

        req.user = user;
        next();

    }catch(err){
        res.status(400).send("ERROR : ", err.messsage)
    }
}

module.exports= { authUser }