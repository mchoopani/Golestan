const express = require("express");
const router = require("./routes/index.js");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth.js");
const logger = require("./middlewares/logger.js");
const cors = require("cors");
const redis = require("redis");

require("dotenv").config()
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST||"127.0.0.1"}:${process.env.DB_PORT||27017}/`)
.then(()=>{
    console.log('Connected to database')
}).catch(err =>{
    console.log("error in connection to database", err.message)
})
mongoose.set('debug', true);

let redisClient;

(async () => {
    redisClient = redis.createClient({
        url: `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT||6379}`
    });

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
})();

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger.getLogger());
app.use(auth.login(redisClient));
app.use(auth.getAuthMiddleware(redisClient));
app.use(router);

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`server started to listen on port ${process.env.SERVER_PORT}`)
})
