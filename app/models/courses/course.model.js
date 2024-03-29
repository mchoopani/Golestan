const mongoose = require("mongoose")
const Course = mongoose.model(
    "course",
    mongoose.Schema({
        name: String,
        x: [String],
        prerequisites: [this],
        corequisites: [this],
        unit: Number,
        field: String,
    })
);

module.exports = Course