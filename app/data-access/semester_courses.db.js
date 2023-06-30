function makeSemesterCourseDb(SemesterCourse) {
    async function findAll() {
        return await SemesterCourse.find({});
    }
    async function findByID(id) {
        return await SemesterCourse.findById(id);
    }
    async function deleteByID(id) {
        return await SemesterCourse.findByIdAndDelete(id);
    }

    async function updateByID(id, data) {
        return await SemesterCourse.findByIdAndUpdate(id, data);
    }

    async function updateByQuery(q, data) {
        return await SemesterCourse.findOneAndUpdate(q, data);
    }

    async function create(data) {
        return await SemesterCourse.create(data);
    }

    return Object.freeze({
        findAll,
        findByID,
        deleteByID,
        updateByID,
        create,
        updateByQuery,
    })
}

module.exports = makeSemesterCourseDb