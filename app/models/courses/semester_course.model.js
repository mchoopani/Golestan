const mongoose = require("mongoose");
const Course = require("./course.model");
const Preregistration = require("../registration_requests/preregistration.model")
const Registration = require("../registration_requests/registration.model")
const SemesterCourse = Course.discriminator(
    "semester_course",
    mongoose.Schema({
        classDates: [Date],
        examDate: Date,
        examPlace: String,
        professorName: String,
        capacity: Number,
        semester: mongoose.Schema.Types.ObjectId,
        preregistrations: [{type: Preregistration.schema}],
        registrations: [{type: Registration.schema}]
    })
)

module.exports = SemesterCourse