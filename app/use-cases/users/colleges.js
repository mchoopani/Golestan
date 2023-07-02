const getUseCase = require("../abstract.js");
const accessDb = require("../../data-access");

module.exports = getUseCase(accessDb.collegeDb)
