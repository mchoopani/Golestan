const mongoose = require("mongoose")
const PreRegistrationRequest = mongoose.model(
    "preregistration_request",
    mongoose.Schema({
        requestedStudent: {type: mongoose.Schema.Types.ObjectId, ref: 'student'},
    })
)
module.exports = PreRegistrationRequest
