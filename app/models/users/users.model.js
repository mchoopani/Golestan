const mongoose = require("mongoose")
const User = mongoose.model(
    "user",
    mongoose.Schema({
        fullname: String,
        usercode: {
            type: String,
            required: true,
            minLength: 5,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 5
        },
        email: String,
        phoneNumber: String,
    })
)
module.exports = User