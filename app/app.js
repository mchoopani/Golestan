const express = require("express");
const router = require("./routes/index.js");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth.js");
const logger = require("./middlewares/logger.js");
require("dotenv").config()
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST||"127.0.0.1"}:${process.env.DB_PORT||27017}/`)
.then(()=>{
    console.log('Connected to database')
}).catch(err =>{
    console.log("error in connection to database", err.message)
})

const app = express();
app.use(express.json());
app.use(logger.getLogger());
app.use(auth.login());
app.use(auth.authMiddleware);
app.use(router);

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`server started to listen on port ${process.env.SERVER_PORT}`)
})