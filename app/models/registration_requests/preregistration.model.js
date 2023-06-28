const mongoose = require("mongoose")
const Student = require("../users/students.model")
const PreRegistrationRequest = mongoose.model(
    "preregistration_request",
    mongoose.Schema({
        requestedStudent: Student.schema,
    })
)
module.exports = PreRegistrationRequest
