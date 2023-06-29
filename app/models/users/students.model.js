const mongoose = require("mongoose");
const User = require("./users.model.js");
const Course = require("../courses/semester_course.model")
const Student = User.discriminator(
    "student",
    mongoose.Schema({
        grade: String,
        joinDate: Date,
        joinSemester: String,
        averageScore: Number,
        college: String,
        studyField: String,
        preregistrationCourses: [Course.schema],
        registrationCourses: [Course.schema]
    })
)

module.exports = Student;