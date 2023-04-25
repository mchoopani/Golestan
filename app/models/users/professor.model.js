const mongoose = require("mongoose");
const User = require("./users.model.js");

const Professor = User.discriminator(
    "professor",
    mongoose.Schema({
        college: String,
        studyField: String,
        grade: String,
    })
);

module.exports = Professor;