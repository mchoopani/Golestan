const mongoose = require("mongoose")
const SemesterCourse = require("../courses/semester_course.model.js")
const Term = mongoose.model(
    "term",
    mongoose.Schema({
        name: String,
        joinerCodes: [String],
        preregistrationCourses: [{type: SemesterCourse.schema}],
        registrationCourses: [{type: SemesterCourse.schema}]
    })
)
module.exports = Term
