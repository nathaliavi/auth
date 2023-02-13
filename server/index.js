const express = require('express');
const cors = require('cors')
const app = express()

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set("strictQuery", true)

const authRoutes = require('./Routes/AuthRoutes')

const cookieParser = require('cookie-parser')

app.listen(4000, () => {
    console.log('Server started on PORT 4000')
});

mongoose.connect("mongodb://127.0.0.1:27017/jwt", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connection Successfull")
}).catch(err => {
    console.log("Mongoose Error connection: ", err.message)
})

app.use(cors({
    origin: ["http://localhost:3000"],
    method: ['GET', 'POST'],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json());
app.use('/', authRoutes)