function makeCourseDb(Course) {
    async function findAll() {
        return await Course.find({});
    }
    async function findByID(id) {
        return await Course.findById(id);
    }
    async function deleteByID(id) {
        return await Course.findByIdAndDelete(id);
    }

    async function updateByID(id, data) {
        return await Course.findByIdAndUpdate(id, data);
    }

    async function create(data) {
        return await Course.create(data);
    }

    return Object.freeze({
        findAll,
        findByID,
        deleteByID,
        updateByID,
        create,
    })
}

module.exports = makeCourseDb