const mongoose = require("mongoose");
const Student = mongoose.model(
    "student",
    mongoose.Schema({
        grade: String,
        joinDate: Date,
        joinSemester: String,
        averageScore: Number,
        college: String,
        studyField: String,
    }),
);

module.exports = Student;