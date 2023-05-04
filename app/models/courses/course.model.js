const mongoose = require("mongoose")
const Course = mongoose.model(
    "course",
    mongoose.Schema({
        name: String,
        prerequisites: [String],
        corequisites: [String],
        unit: Number,
        field: String,
    })
);

module.exports = Course