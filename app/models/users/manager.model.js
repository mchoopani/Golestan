const mongoose = require("mongoose");
const User = require("./users.model.js");

const Manager = User.discriminator(
    "manager",
    mongoose.Schema({
        college: String,
    })
);

module.exports = Manager;