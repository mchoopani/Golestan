const mongoose = require("mongoose");
const User = require("./users.model.js");

const Student = User.discriminator(
    "student",
    mongoose.Schema({
        grade: String,
        joinDate: Date,
        joinSemester: String,
        averageScore: Number,
        college: String,
        studyField: String,
    })
)

module.exports = Student;