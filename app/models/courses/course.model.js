const mongoose = require("mongoose")
const Course = mongoose.model(
    "course",
    mongoose.Schema({
        name: String,
        prerequisites: [this],
        corequisites: [this],
        unit: Number,
        field: String,
        registrations: [{type: mongoose.Schema.Types.ObjectId, ref: 'registration_request'}]
    })
);

module.exports = Course