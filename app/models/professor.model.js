const mongoose = require("mongoose");
const Professor = mongoose.model(
    "professor",
    mongoose.Schema({
        college: String,
        studyField: String,
        grade: String,
    }),
);

module.exports = Professor;