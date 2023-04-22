const makeUsersDb = require("./users.db.js");
const makeStudentDb = require("./students.db.js");
const makeProfessorDb = require("./professors.db.js");
const Student = require("../models/students.model.js");
const Professor = require("../models/professor.model.js")
const User = require( "../models/index.js");

const usersDb = makeUsersDb(User);
const studentsDb = makeStudentDb(Student);
const professorsDb = makeProfessorDb(Professor);

module.exports = Object.freeze({
    usersDb,
    studentsDb,
    professorsDb,
})
