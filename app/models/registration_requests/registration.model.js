const mongoose = require("mongoose")
const Student = require("../users/students.model")
const RegistrationRequest = mongoose.model(
    "registration_request",
    mongoose.Schema({
        requestedStudent: Student.schema,
        status: String, // TODO: make enum
    })
)
module.exports = RegistrationRequest