const express = require('express');

const app = express();
app.get('/', (req, res)=>{
    res.send({
        message: "Welcome To Uur Applicartion"
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT: ${PORT} ` )
})