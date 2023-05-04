const mongoose = require("mongoose");
const User = require("./users.model.js");

const ITManager = User.discriminator(
    "it_manager",
    mongoose.Schema({})
);

module.exports = ITManager;