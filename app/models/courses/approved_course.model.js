const mongoose = require("mongoose");
const Course = require("./course.model")
const ApprovedCourse = Course.discriminator(
    "approved_course",
    mongoose.Schema({})
);

module.exports = ApprovedCourse