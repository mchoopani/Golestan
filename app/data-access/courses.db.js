function makeCourseDb(Course) {
    async function findAll(filters) {
        return await Course.find(filters).populate('registrations.requestedStudent');
    }
    async function findByID(id) {
        return await Course.findById(id).populate('registrations.requestedStudent');
    }
    async function deleteByID(id) {
        return await Course.findByIdAndDelete(id);
    }

    async function updateByID(id, data) {
        return await Course.findByIdAndUpdate(id, data);
    }

    async function updateByQuery(q, data) {
        return await Course.findOneAndUpdate(q, data);
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
        updateByQuery,
    })
}

module.exports = makeCourseDb