const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/database');
const User = require('./models/user');
const { validationSignup } = require('./utils/validation')
const { authUser } = require('./middleware/auth')

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req, res) => {
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
})

app.post('/login', async(req, res) =>{
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

app.get('/profile', authUser, async (req, res) => {
    try{
        res.status(200).send(req.user)
    }catch(err){
        res.status(400).send("ERROR : ", + err)
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