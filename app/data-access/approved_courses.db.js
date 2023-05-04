const { model } = require("mongoose");

function makeApprovedCourseDb(ApprovedCourse) {
    async function findAll() {
        return await ApprovedCourse.find({});
    }
    async function findByID(id) {
        return await ApprovedCourse.findById(id);
    }
    async function deleteByID(id) {
        return await ApprovedCourse.findByIdAndDelete(id);
    }

    async function updateByID(id, data) {
        return await ApprovedCourse.findByIdAndUpdate(id, data);
    }

    async function create(data) {
        return await ApprovedCourse.create(data);
    }

    return Object.freeze({
        findAll,
        findByID,
        deleteByID,
        updateByID,
        create,
    })
}

module.exports = makeApprovedCourseDb