const professorsUseCase = require("./professors.js");
const studentsUseCase = require("./students.js");
const managersUseCase = require("./managers.js")

module.exports = Object.freeze({
    professorsUseCase,
    studentsUseCase,
    managersUseCase,
})