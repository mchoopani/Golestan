const express = require('express');
const router = require("./routes/index.js")
const mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@localhost:27017/').then(()=>{
    console.log('Connected to database')
}).catch(err =>{
    console.log(err.message)
})

const app = express();
app.use(express.json());
app.use("/", router);

app.listen(8090, ()=>{
    console.log('server started to listen')
})


