const approvedCourseUseCase = require("./approved_course.js");
const semesterCourseUseCase = require("./semester_course.js");
const accessDb = require("../../data-access/index.js");
const errors = require("../../errors/index.js");
const { default: mongoose } = require("mongoose");

function validateIdsOrThrowException(ids) {
    for (let id of ids) {
        if (!mongoose.isValidObjectId(id)){
            throw new errors.ValidationError("id " + id + " isn't valid.")
        }
    }
}

function getMissingIdValidationError(allCourseIds, foundCourses) {
    let missingIds = []
    let foundIds = []
    for (let course of foundCourses) {
        foundIds.push(String(course._id))
    }
    for (let courseId of allCourseIds) {
        if (!foundIds.includes(courseId)) {
            missingIds.push(courseId)
        }
    }
    return new errors.ValidationError("some prerequisites or corequisites course ids not found: " + missingIds)
}

function seperatePreAndCoRequisites(preAndCoRequisiteCourses, prerequisitesIds, corequisitesIds) {
    let preCourses = []
    let coCourses = []
    
    for (let course of preAndCoRequisiteCourses) {
        if (prerequisitesIds.includes(String(course._id))) {
            preCourses.push(course)
        }
        if (corequisitesIds.includes(String(course._id))) {
            coCourses.push(course)
        }
    }


    return [preCourses, coCourses]
}

async function createCourse(data) {
    let allDependentCoursesIds = new Set(data.prerequisites.concat(data.corequisites))
    validateIdsOrThrowException(allDependentCoursesIds)

    let preAndCoRequisiteCourses = await accessDb.coursesDb.findBatchCourseByBatchID(allDependentCoursesIds)
    if (allDependentCoursesIds.size != preAndCoRequisiteCourses.length) {
        throw getMissingIdValidationError(allDependentCoursesIds, preAndCoRequisiteCourses)
    }

    let [preCourses, coCourses] = seperatePreAndCoRequisites(preAndCoRequisiteCourses, data.prerequisites, data.corequisites)
    if (data.courseType == 'approved') {
        return await approvedCourseUseCase.createApprovedCourse(data, preCourses, coCourses) 
    } else if (data.courseType == 'semester') {
        return await semesterCourseUseCase.createSemesterCoures(data, preCourses, coCourses) 
    }

    throw new errors.ValidationError("Invalid course type")
}

async function getAllCourses(requestedUser, params) {

    filters = {}
    console.log(params)
    if (params.field != undefined) {
        filters.field = params.field
    }
    if (requestedUser.role == "student") {
        const student = await accessDb.studentsDb.findByID(requestedUser._id);
        filters.field = student.college
    }
    return await accessDb.coursesDb.findAll(filters);
}

async function updateCourse(id, data) {
    presData = data.prerequisites
    cosData = data.corequisites
    if (!presData) {
        presData = []
    }
    if (!cosData) {
        cosData = []
    }

    let allDependentCoursesIds = new Set(presData.concat(cosData))
    validateIdsOrThrowException(allDependentCoursesIds)

    let preAndCoRequisiteCourses = await accessDb.coursesDb.findBatchCourseByBatchID(allDependentCoursesIds)
    if (allDependentCoursesIds.size != preAndCoRequisiteCourses.length) {
        throw getMissingIdValidationError(allDependentCoursesIds, preAndCoRequisiteCourses)
    }

    let preCourses, coCourses = seperatePreAndCoRequisites(preAndCoRequisiteCourses, presData, cosData)
    if (!data.prerequisites) {
        data.prerequisites = preCourses
    }
    if (!data.corequisites) {
        data.corequisites = coCourses
    }
    return await accessDb.coursesDb.updateByID(id, data);
}

async function deleteCourse(id) {
    return await accessDb.coursesDb.deleteByID(id);
}

async function getCourseByID(requestedUser, id) {
    const course = await accessDb.coursesDb.findByID(id);
    if (course == null) {
        throw new errors.NotFoundError("course not found")
    }
    const student = await accessDb.studentsDb.findByID(requestedUser._id);
    if (student && course.field != student.college) {
        throw new errors.PermissionError("you can't access to this course")
    }
    return course;
}

module.exports = Object.freeze({
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getCourseByID,
});