const express = require("express");
const app = express();
const { connectDb } = require("./config/database");
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());

const authRouter =  require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const userRouter = require('./routes/user')

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/', userRouter)

connectDb().then(() => {
    console.log("database connetion stablished")
    app.listen(3000, () => {
        console.log("server is successfully running on port: 3000");
    })

}).catch((err) => {
    console.error("database can not be connected")
})

