function makeProfessorDb(Professor) {
    async function findAll() {
        return await Professor.find({});
    }
    async function findByID(id) {
        return await Professor.findById(id);
    }
    async function deleteByID(id) {
        return await Professor.findByIdAndDelete(id);
    }
    async function updateByID(id, data) {
        return await Professor.findByIdAndUpdate(id, data);
    }
    async function create(data) {
        return await Professor.create(data);
    }
    return Object.freeze({
        findAll,
        findByID,
        deleteByID,
        updateByID,
        create,
    });
}

module.exports = makeProfessorDb;