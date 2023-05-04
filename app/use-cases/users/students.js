const accessDb = require("../../data-access");

async function createStudent(data) {
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