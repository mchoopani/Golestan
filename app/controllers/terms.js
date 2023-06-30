const termUseCase = require("../use-cases/terms/term.js");
const courseUseCase = require("../use-cases/courses/courses.js");
const errors = require("../errors");
const mongoose = require("mongoose");

async function addPreregistrationCourse(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        let data = req.body
        if (data.courseId === undefined) {
            throw new errors.InvalidArgumentError("invalid or empty course id")
        }
        const course = await courseUseCase.getCourseByID(req.user, data.courseId)
        await termUseCase.addPreregistrationCourseToTerm(req.params.id, course)
        statusCode = 200
        response = {message: "course added to preregistration"}
    } catch (err) {
        if (err instanceof errors.ValidationError ||
            err instanceof mongoose.Error.ValidationError ||
            err instanceof errors.InvalidArgumentError) {
            statusCode = 400
            response = {message: err.message}
        } else {
            statusCode = 500
            console.log(`error ${err.name} occured with this message: ${err}`)
            response = {message: err.message}
        }
    }
    return res.status(statusCode).json(response)
}

async function getPreregistrationCoursesOfTerm(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        const term = await termUseCase.getTermByID(req.params.id)
        response = {message: term.preregistrationCourses}
        statusCode = 200
    } catch (err) {
        if (err instanceof errors.ValidationError ||
            err instanceof mongoose.Error.ValidationError ||
            err instanceof errors.InvalidArgumentError) {
            statusCode = 400
            response = {message: err.message}
        } else {
            statusCode = 500
            console.log(`error ${err.name} occured with this message: ${err}`)
            response = {message: err.message}
        }
    }
    return res.status(statusCode).json(response)
}


async function deleteCourseFromPreregistrationCourseListOfTerm(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        await termUseCase.deletePreregistrationCourseFromTerm(req.params.id, req.params.course_id)
        await courseUseCase.deleteCourse(req.params.course_id)
        statusCode = 200
        response = {message: "course deleted from preregistration"}
    } catch (err) {
        if (err instanceof errors.ValidationError ||
            err instanceof mongoose.Error.ValidationError ||
            err instanceof errors.InvalidArgumentError) {
            statusCode = 400
            response = {message: err.message}
        } else if (err instanceof errors.NotFoundError) {
            statusCode = 404
            response = {message: err.message}
        } else {
            statusCode = 500
            console.log(`error ${err.name} occured with this message: ${err}`)
            response = {message: err.message}
        }
    }
    return res.status(statusCode).json(response)
}


async function addRegistrationCourse(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        let data = req.body
        if (data.courseId === undefined) {
            throw new errors.InvalidArgumentError("invalid or empty course id")
        }
        const course = await courseUseCase.getCourseByID(req.user, data.courseId)
        await termUseCase.addRegistrationCourseToTerm(req.params.id, course) // TODO
        statusCode = 200
        response = {message: "course added to registration"}
    } catch (err) {
        if (err instanceof errors.ValidationError ||
            err instanceof mongoose.Error.ValidationError ||
            err instanceof errors.InvalidArgumentError) {
            statusCode = 400
            response = {message: err.message}
        } else if (err instanceof errors.NotFoundError) {
            statusCode = 404
            response = {message: err.message}
        } else {
            statusCode = 500
            console.log(`error ${err.name} occured with this message: ${err}`)
            response = {message: err.message}
        }
    }
    return res.status(statusCode).json(response)
}

async function getRegistrationCoursesOfTerm(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        const term = await termUseCase.getTermByID(req.params.id)
        response = {message: term.registrationCourses}
        statusCode = 200
    } catch (err) {
        if (err instanceof errors.ValidationError ||
            err instanceof mongoose.Error.ValidationError ||
            err instanceof errors.InvalidArgumentError) {
            statusCode = 400
            response = {message: err.message}
        } else if (err instanceof errors.NotFoundError) {
            statusCode = 404
            response = {message: err.message}
        } else {
            statusCode = 500
            console.log(`error ${err.name} occured with this message: ${err}`)
            response = {message: err.message}
        }
    }
    return res.status(statusCode).json(response)
}


async function deleteCourseFromRegistrationCourseListOfTerm(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        await termUseCase.deleteRegistrationCourseFromTerm(req.params.id, req.params.course_id)
        await courseUseCase.deleteCourse(req.params.course_id)
        statusCode = 200
        response = {message: "course added to registration"}
    } catch (err) {
        if (err instanceof errors.ValidationError ||
            err instanceof mongoose.Error.ValidationError ||
            err instanceof errors.InvalidArgumentError) {
            statusCode = 400
            response = {message: err.message}
        } else if (err instanceof errors.NotFoundError) {
            statusCode = 404
            response = {message: err.message}
        } else {
            statusCode = 500
            console.log(`error ${err.name} occured with this message: ${err}`)
            response = {message: err.message}
        }
    }
    return res.status(statusCode).json(response)
}

module.exports = Object.freeze({
    addPreregistrationCourse,
    getPreregistrationCoursesOfTerm,
    deleteCourseFromPreregistrationCourseListOfTerm,
    addRegistrationCourse,
    getRegistrationCoursesOfTerm,
    deleteCourseFromRegistrationCourseListOfTerm,
})