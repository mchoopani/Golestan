function makeTermDb(Term) {
    async function findAll() {
        return await Term.find({}).populate('preregistrationCourses').populate('registrationCourses');
    }
    async function findByID(id) {
        return await Term.findById(id).populate('registrationCourses').populate('preregistrationCourses');
    }
    async function deleteByID(id) {
        return await Term.findByIdAndDelete(id);
    }
    async function updateByID(id, data) {
        return await Term.findByIdAndUpdate(id, data);
    }
    async function create(data) {
        return await Term.create(data);
    }
    return Object.freeze({
        findAll,
        findByID,
        deleteByID,
        updateByID,
        create,
    });
}

module.exports = makeTermDb;
