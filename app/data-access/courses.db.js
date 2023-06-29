function makeCourseDb(Course) {
    async function findAll(filters) {
        return await Course.find(filters).populate('registrations');
    }
    async function findByID(id) {
        return await Course.findById(id).populate('registrations');
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

    async function findBatchCourseByBatchID(ids) {
        return await Course.find({
            "_id": {
                $in: new Array(...ids)
            }
        })
    }

    return Object.freeze({
        findAll,
        findByID,
        deleteByID,
        updateByID,
        create,
        findBatchCourseByBatchID,
    })
}

module.exports = makeCourseDb