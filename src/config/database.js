const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://atmishkumar:st9ev5DopUokOnm7@cluster0.sl1aloy.mongodb.net/devTinder')
}

module.exports = connectDB
