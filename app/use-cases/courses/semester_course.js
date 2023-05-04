const accessDb = require("../../data-access");

async function createSemesterCoures(data) {
    return await accessDb.semesterCoursesDb.create(data);
}

async function getAllSemesterCouress() {
    return await accessDb.semesterCoursesDb.findAll();
}

async function updateSemesterCoures(id, data) {
    return await accessDb.semesterCoursesDb.updateByID(id, data);
}

async function deleteSemesterCoures(id) {
    return await accessDb.semesterCoursesDb.deleteByID(id);
}

async function getSemesterCourseByID(id) { 
    return await accessDb.semesterCoursesDb.findByID(id);
}

module.exports = Object.freeze({
    createSemesterCoures,
    getAllSemesterCouress,
    updateSemesterCoures,
    deleteSemesterCoures,
    getSemesterCourseByID,
});