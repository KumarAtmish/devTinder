const express = require('express')

const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();

app.post("/signup", async(req, res) => {
    // Create a new instance or the User model
    let user = new User({
        firstName: 'ram',
        lastName: 'kumar',
        emailId: 'ram@gmail.com',
        password:'Ram@123',
        age: 24,
        gender: 'male',
    });

    try{
        await user.save();
        res.status(200).send('User added successfully')
    } catch(err){
        res.status(400).send('Error saving the user:' + err.message)
    }
})

app.get("/signup", async(req, res) => {
    
    // res.status(200).send('User added successfully')
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