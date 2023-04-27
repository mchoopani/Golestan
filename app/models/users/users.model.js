const mongoose = require("mongoose")
const User = mongoose.model(
    "user",
    mongoose.Schema({
        fullname: String,
        usercode: String, // TODO: make required
        password: String,
        email: String,
        phoneNumber: String,
    })
)
module.exports = User