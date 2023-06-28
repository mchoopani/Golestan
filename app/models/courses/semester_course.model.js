const mongoose = require("mongoose");
const Course = require("./course.model");
const Preregistration = require("../registration_requests/preregistration.model")
const SemesterCourse = Course.discriminator(
    "semester_course",
    mongoose.Schema({
        classDates: [Date],
        examDate: Date,
        examPlace: String,
        professorName: String,
        capacity: Number,
        semester: String,
        preregistrations: [{type: Preregistration.schema}]
    })
)

module.exports = SemesterCourse