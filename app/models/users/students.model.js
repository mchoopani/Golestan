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
        preregistrationCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'course'}],
        registrationCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'course'}]
    })
)

module.exports = Student;