const express = require('express');
const router = require("./routes/index.js")
const mongoose = require('mongoose');
const auth = require('./middlewares/auth.js')
mongoose.connect('mongodb://root:root@localhost:27017/').then(()=>{
    console.log('Connected to database')
}).catch(err =>{
    console.log(err.message)
})

const app = express();
app.use(express.json());
app.use(auth.login());
app.use(auth.authMiddleware);
app.use(router);

app.listen(8090, ()=>{
    console.log('server started to listen')
})


