const accessDb = require("../../data-access");

async function createProfessor(data) {
    console.log(data)
    return await accessDb.professorsDb.create(data);
}

async function getAllProfessors() {
    return await accessDb.professorsDb.findAll();
}

async function updateProfessor(id, data) {
    return await accessDb.professorsDb.updateByID(id, data);
}

async function deleteProfessor(id) {
    return await accessDb.professorsDb.deleteByID(id);
}

async function getProfessorByID(id) { 
    return await accessDb.professorsDb.findByID(id);
}

module.exports = Object.freeze({
    createProfessor,
    getAllProfessors,
    updateProfessor,
    deleteProfessor,
    getProfessorByID,
});