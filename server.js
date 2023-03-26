const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/userRouter');


const app = express();
app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false })) // Form Data Handle //
app.use(bodyParser.json()) // Json Data Handle //


app.use('/api/user', router)


app.get('/', async (req, res) => {
    await res.send({
        message: "Welcome To Our Application"
    })
})









const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`)
    await mongoose.connect('mongodb://127.0.0.1:27017/money-app');
})