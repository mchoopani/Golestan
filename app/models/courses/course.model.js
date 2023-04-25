const mongoose = require("mongoose")
const Course = mongoose.model(
    "course",
    mongoose.Schema({
        name: String,
        prerequisites: [String],
        coRequisites: [String],
        unit: Number,
    })
);

module.exports = Course