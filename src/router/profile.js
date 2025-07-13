const express = require('express');
const { authUser } = require('../middleware/auth');

const profileRouter = express.Router();

profileRouter.get('/profile', authUser, async (req, res) => {
    try{
        res.status(200).send(req.user)
    }catch(err){
        res.status(400).send("ERROR : ", + err)
    }
})
module.exports = profileRouter