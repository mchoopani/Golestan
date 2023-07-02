const mongoose = require("mongoose")
const College = mongoose.model(
    "college",
    mongoose.Schema({
        name: String
    })
)
module.exports = College
