const express = require('express');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const { validationSignup } = require('./utils/validation')
const { authUser } = require('./middleware/auth')

const app = express();

app.use(express.json());
app.use(cookieParser());


const authRouter = require('./router/auth');
const profileRouter = require('./router/profile');
const userRouter = require('./router/user');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', userRouter)



connectDB()
.then(() => {
    console.log('Database connection established!!!')
    app.listen(7777, () =>{
        console.log("server started on port 7777")
    })
}).catch(err =>{
    console.log('Database connection Failed')
})