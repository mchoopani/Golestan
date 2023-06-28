const accessDb = require("../../data-access");
const errors = require("../../errors");

async function getAllTerms() {
    return await accessDb.termsDb.findAll();
}

async function getTermByID(id) {
    const term = await accessDb.termsDb.findByID(id)
    if (term == null) {
        throw new errors.NotFoundError("term not found")
    }
    return term;
}

async function createTerm(data) {
    return await accessDb.termsDb.create(data);
}

async function updateTermById(id, data) {
    return await accessDb.termsDb.updateByID(id, data);
}

async function deleteTermById(id) {
    return await accessDb.termsDb.deleteByID(id);
}

async function addPreregistrationCourseToTerm(termId, course) {
    const term = await accessDb.termsDb.findByID(termId)
    if (term == null) {
        throw new errors.NotFoundError("term not found")
    }
    term.preregistrationCourses.push(course)
    await accessDb.termsDb.updateByID(termId, term)
}

async function addRegistrationCourseToTerm(termId, course) {
    const term = await accessDb.termsDb.findByID(termId)
    if (term == null) {
        throw new errors.NotFoundError("term not found")
    }
    term.registrationCourses.push(course)
    await accessDb.termsDb.updateByID(termId, term)
}

async function deletePreregistrationCourseFromTerm(termId, course_id) {
    const term = await accessDb.termsDb.findByID(termId)
    if (term == null) {
        throw new errors.NotFoundError("term not found")
    }
    let toDeleteIndex = undefined
    for (let i = 0; i < term.preregistrationCourses.length; i++) {
        if (term.preregistrationCourses[i]._id === course_id) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        throw new errors.NotFoundError("course not found")
    }
    term.preregistrationCourses = term.preregistrationCourses.splice(toDeleteIndex, 1)
    await accessDb.termsDb.updateByID(termId, term)
}

async function deleteRegistrationCourseFromTerm(termId, course_id) {
    const term = await accessDb.termsDb.findByID(termId)
    if (term == null) {
        throw new errors.NotFoundError("term not found")
    }
    let toDeleteIndex = undefined
    for (let i = 0; i < term.registrationCourses.length; i++) {
        if (term.registrationCourses[i]._id === course_id) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        throw new errors.NotFoundError("course not found")
    }
    term.registrationCourses = term.registrationCourses.splice(toDeleteIndex, 1)
    await accessDb.termsDb.updateByID(termId, term)
}

module.exports = Object.freeze({
    getAllTerms,
    getTermByID,
    createTerm,
    updateTermById,
    deleteTermById,
    addPreregistrationCourseToTerm,
    deletePreregistrationCourseFromTerm,
    addRegistrationCourseToTerm,
    deleteRegistrationCourseFromTerm,
});