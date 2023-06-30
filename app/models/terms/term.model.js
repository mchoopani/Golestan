const mongoose = require("mongoose")
const Term = mongoose.model(
    "term",
    mongoose.Schema({
        name: String,
        joinerCodes: [String],
        preregistrationCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'course'}],
        registrationCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'course'}]
    })
)

module.exports = Term
