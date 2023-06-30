const mongoose = require("mongoose");
const College = mongoose.model(
    "term",
    mongoose.Schema({
        name: String,
    })
);
module.exports = College;
