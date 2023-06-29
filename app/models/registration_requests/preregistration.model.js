const mongoose = require("mongoose")
const Student = require("../users/students.model")
const Course = require("../courses/course.model.js")
const PreRegistrationRequest = mongoose.model(
    "preregistration_request",
    mongoose.Schema({
        requestedStudent: Student,
        course: Course.schema,
    })
)
module.exports = PreRegistrationRequest
