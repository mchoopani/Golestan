const makeUsersDb = require("./users.db.js");
const makeStudentDb = require("./students.db.js");
const Student = require("../models/studetns.model.js");
User = require( "../models/index.js");

const usersDb = makeUsersDb(User);
const studentsDb = makeStudentDb(Student);

module.exports = Object.freeze({
    usersDb,
    studentsDb,
})

