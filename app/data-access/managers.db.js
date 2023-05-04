function makeManagerDB(Manager) {
    async function findAll() {
        return await Manager.find({});
    }
    async function findByID(id) {
        return await Manager.findById(id);
    }
    async function deleteByID(id) {
        return await Manager.findByIdAndDelete(id);
    }
    async function updateByID(id, data) {
        return await Manager.findByIdAndUpdate(id, data);
    }
    async function create(data) {
        return await Manager.create(data);
    }
    return Object.freeze({
        findAll,
        findByID,
        deleteByID,
        updateByID,
        create,
    });
}

module.exports = makeManagerDB;