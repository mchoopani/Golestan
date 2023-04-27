const approvedCourseUseCase = require("./approved_course.js");
const semesterCourseUseCase = require("./semester_course.js");
const accessDb = require("../../data-access/index.js");

async function createCourse(data) {
    if (data.courseType == 'approved') {
        return await approvedCourseUseCase.createApprovedCourse(data) 
    } else if (data.courseType == 'semester') {
        return await semesterCourseUseCase.createSemesterCoures(data) 
    }

    throw Error("Invalid course type")
}

async function getAllCourses(params) {
    filters = {}
    if (params.field != undefined) {
        filters.field = params.field
    }
    return await accessDb.coursesDb.findAll(filters);
}

async function updateCourse(id, data) {
    return await accessDb.coursesDb.updateByID(id, data);
}

async function deleteCourse(id) {
    return await accessDb.coursesDb.deleteByID(id);
}

async function getCourseByID(id) { 
    return await accessDb.coursesDb.findByID(id);
}

module.exports = Object.freeze({
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getCourseByID,
});