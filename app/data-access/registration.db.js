function makeRegistrationDb(Registration) {
    async function findAll() {
        return await Registration.find({});
    }
    async function findByID(id) {
        return await Registration.findById(id);
    }
    async function deleteByID(id) {
        return await Registration.findByIdAndDelete(id);
    }
    async function updateByID(id, data) {
        return await Registration.findByIdAndUpdate(id, data);
    }
    async function create(data) {
        return await Registration.create(data);
    }
    return Object.freeze({
        findAll,
        findByID,
        deleteByID,
        updateByID,
        create,
    });
}

module.exports = makeRegistrationDb;
