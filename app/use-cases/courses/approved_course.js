const accessDb = require("../../data-access");

async function createApprovedCourse(data, prerequisites, corequisites) {
    data.corequisites = corequisites
    data.prerequisites = prerequisites
    return await accessDb.approvedCoursesDb.create(data);
}

async function getAllApprovedCourses() {
    return await accessDb.approvedCoursesDb.findAll(filters);
}

async function updateApprovedCourse(id, data) {
    return await accessDb.approvedCoursesDb.updateByID(id, data);
}

async function deleteApprovedCourse(id) {
    return await accessDb.approvedCoursesDb.deleteByID(id);
}

async function getApprovedCourseByID(id) { 
    return await accessDb.approvedCoursesDb.findByID(id);
}

module.exports = Object.freeze({
    createApprovedCourse,
    getAllApprovedCourses,
    updateApprovedCourse,
    deleteApprovedCourse,
    getApprovedCourseByID,
});