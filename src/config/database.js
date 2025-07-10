const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://atmishkumar:QoxPWWb6cmUy05Xu@cluster0.ji1haru.mongodb.net/devTinder')
}

module.exports = connectDB
