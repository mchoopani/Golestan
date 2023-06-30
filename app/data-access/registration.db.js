function makeRegistrationDb(Registration) {
    async function findAll() {
        return await Registration.find({}).populate('requestedStudent').populate('course');
    }
    async function findByID(id) {
        return await Registration.findById(id).populate('requestedStudent').populate('course');
    }
    async function deleteByID(id) {
        return await Registration.findByIdAndDelete(id);
    }
    async function deleteOneByQuery(q) {
        return await Registration.findOneAndDelete(q)
    }
    async function updateByID(id, data) {
        return await Registration.findByIdAndUpdate(id, data).populate('course');
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
        deleteOneByQuery,
    });
}

module.exports = makeRegistrationDb;
