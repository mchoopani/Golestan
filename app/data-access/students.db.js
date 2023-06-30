function makeStudentDb(Student) {
    async function findAll() {
        return await Student.find({}).populate('preregistrationCourses').populate('registrationCourses');
    }
    async function findByID(id) {
        return await Student.findById(id).populate('preregistrationCourses').populate('registrationCourses');
    }
    async function deleteByID(id) {
        return await Student.findByIdAndDelete(id);
    }
    async function updateByID(id, data) {
        return await Student.findByIdAndUpdate(id, data);
    }
    async function create(data) {
        return await Student.create(data);
    }
    return Object.freeze({
        findAll,
        findByID,
        deleteByID,
        updateByID,
        create,
    });
}

module.exports = makeStudentDb;