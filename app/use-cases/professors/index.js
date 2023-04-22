const accessDb = require("../../data-access");

async function createProfessor(data) {
    const user = await accessDb.usersDb.findByUsername(data.usercode);
    if (user != null) {
        throw ValidationError("usercode is duplicated.")
    }
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