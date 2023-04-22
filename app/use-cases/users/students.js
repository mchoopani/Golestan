const accessDb = require("../../data-access");
const errors = require("../../errors/index.js");

async function createStudent(data) {
    const user = await accessDb.usersDb.findByUsername(data.usercode);
    if (user != null) {
        throw new errors.ValidationError("usercode is duplicated.")
    }
    return await accessDb.studentsDb.create(data);
}

async function getAllStudents() {
    return await accessDb.studentsDb.findAll();
}

async function updateStudent(id, data) {
    return await accessDb.studentsDb.updateByID(id, data);
}

async function deleteStudent(id) {
    return await accessDb.studentsDb.deleteByID(id);
}

async function getStudentByID(id) { 
    return await accessDb.studentsDb.findByID(id);
}

module.exports = Object.freeze({
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    getStudentByID,
});