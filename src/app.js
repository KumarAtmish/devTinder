const express = require('express')

const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();

app.use(express.json());

app.post("/signup", async(req, res) => {
    // Create a new instance or the User model
    let user = new User(req.body);

    try{
        await user.save();
        res.status(200).send('User added successfully')
    } catch(err){
        res.status(400).send('Error saving the user:' + err.message)
    }
})

app.get('/user', async(req, res) => {
    let userEmail = req.body.emailId;

    try{
        let user = await User.findOne({emailId:userEmail})
        res.status(200).send(user)
    }catch(err){
        res.status(400).send('Something went wrong');
    }
})

app.get('/feed', async(req, res) => {

    try{
        // let user = await User.find({emailId: userEmail})
        let user = await User.find({})
        res.status(200).send(user)
    }catch(err) {
        res.status(400).send('Something went wrong');
    }
    
})

app.patch('/user/:id', async (req, res)=>{
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

app.delete('/user', async (req, res)=>{

    let userId = req.body.userId;

    try{
        let user = await User.findByIdAndDelete({_id: userId})
        res.status(200).send('user deleted')
    }catch(err){
        res.status(400).send('Something went wrong');
    }
    
})

connectDB()
.then(() => {
    console.log('Database connection established!!!')
    app.listen(7777, () =>{
        console.log("server started on port 7777")
    })
}).catch(err =>{
    console.log('Database connection Failed')
})