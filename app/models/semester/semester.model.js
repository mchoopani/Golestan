const mongoose = require("mongoose")
const Semester = mongoose.model(
    "semester",
    mongoose.Schema({
        name: String
    })
)
module.exports = Semester
