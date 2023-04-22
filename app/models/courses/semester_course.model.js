const mongoose = require("mongoose");
const Course = require("./course.model");
const SemesterCourse = Course.discriminator(
    "semester_course",
    mongoose.Schema({
        classDates: [Date],
        examDate: Date,
        examPlace: String,
        professorName: String,
        capacity: Number,
        semester: String,
    })
)

module.exports = SemesterCourse