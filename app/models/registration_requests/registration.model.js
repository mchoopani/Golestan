const mongoose = require("mongoose")
const RegistrationRequest = mongoose.model(
    "registration_request",
    mongoose.Schema({
        requestedStudent: {type: mongoose.Schema.Types.ObjectId, ref: 'student'},
        course: {type: mongoose.Schema.Types.ObjectId, ref: 'course'},
        status: {type: String, default: "pending"}, // TODO: make enum
    })
)
module.exports = RegistrationRequest
