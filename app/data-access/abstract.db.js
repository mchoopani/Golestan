function makeModelDB(Model) {
    async function findAll() {
        return await Model.find({});
    }
    async function findByID(id) {
        return await Model.findById(id);
    }
    async function deleteByID(id) {
        return await Model.findByIdAndDelete(id);
    }
    async function updateByID(id, data) {
        return await Model.findByIdAndUpdate(id, data);
    }
    async function create(data) {
        return await Model.create(data);
    }
    return Object.freeze({
        findAll,
        findByID,
        deleteByID,
        updateByID,
        create,
    });
}

module.exports = makeModelDB;
