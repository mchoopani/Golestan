const mongoose = require("mongoose")
const SemesterCourse = require("../courses/semester_course.model.js")
const Term = mongoose.model(
    "term",
    mongoose.Schema({
        name: String,
        joinerCodes: [String],
        preregistrationCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
        registrationCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
    })
)

module.exports = Term
