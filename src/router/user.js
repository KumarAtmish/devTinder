const express = require('express');
const User = require('../models/user')

const userRouter = express.Router();

userRouter.get('/user', async(req, res) => {
    let userEmail = req.body.emailId;

    try{
        let user = await User.findOne({emailId:userEmail})
        res.status(200).send(user)
    }catch(err){
        res.status(400).send('Something went wrong');
    }
})

userRouter.patch('/user/:id', async (req, res)=>{
    console.log(req.params.id)
    let id = req.params.id
    let userDetails = req.body

    try{

        const ALLOWED_UPDATE = ['firstName','lastName', 'about', 'gender', 'age', 'skills']
        const isUpdateAllowed = Object?.keys(userDetails)?.every((k) => ALLOWED_UPDATE.includes(k));

        if(!isUpdateAllowed){
            throw new Error('Update data not allowed')
        }

        if(userDetails?.skills?.length>10){
            throw new Error('Skills cannot be more than 10')
        }

        let user = await User.findByIdAndUpdate(id, userDetails, {
            returnDocument: 'after',
            runValidators: true,
        })
        res.status(200).send(user)
    }catch(err){
        res.status(400).send(err.message);
    }
    
})

userRouter.delete('/user', async (req, res)=>{

    let userId = req.body.userId;

    try{
        let user = await User.findByIdAndDelete({_id: userId})
        res.status(200).send('user deleted')
    }catch(err){
        res.status(400).send('Something went wrong');
    }
    
})

module.exports = userRouter