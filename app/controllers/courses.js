const errors = require("../errors/index.js");
const courseUseCase = require("../use-cases/courses/index.js")
const mongoose = require('mongoose')

async function getAllCourses(req, res) {
    let statusCode = undefined
    let response = []
    try {
        const courses = await courseUseCase.coursesUseCase.getAllCourses(req.user, req.query);
        statusCode = 200
        response = courses
    } catch (err) {
        statusCode = 500
        console.log(`error ${err.name} occured with this message: ${err}`)
        response = {message: err.message}  // TODO: send only "internal error" message and log err on server
    }
    return res.status(statusCode).json(response)
}

async function getCourse(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        const course = await courseUseCase.coursesUseCase.getCourseByID(req.user, req.params.id);
        statusCode = 200
        response = course
    } catch (err) {
        if (err instanceof errors.PermissionError) {
            statusCode = 403
            response = {message: err.message}
        } else {
            statusCode = 500
            console.log(`error ${err.name} occured with this message: ${err}`)
            response = {message: err.message} // TODO: send only "internal error" message and log err on server
        }
    }
    return res.status(statusCode).json(response)
}

async function createCourse(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        let data = req.body
        if (!data.corequisites) {
            data.corequisites = []
        }
        if (!data.prerequisites) {
            data.prerequisites = []
        }
        response = await courseUseCase.coursesUseCase.createCourse(data)
        statusCode = 201
    } catch (err) {
        if (err instanceof errors.ValidationError || err instanceof mongoose.Error.ValidationError) {
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

async function getCoursePreregistrations(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        const course = await courseUseCase.coursesUseCase.getCourseByID(req.user, req.params.id);
        response = course.preregistrations
        statusCode = 200
    } catch (err) {
        if (err instanceof errors.ValidationError || err instanceof mongoose.Error.ValidationError) {
            statusCode = 400
            response = {message: err.message}
        } else if(err instanceof errors.NotFoundError) {
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

async function getCourseRegistrations(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        const course = await courseUseCase.coursesUseCase.getCourseByID(req.user, req.params.id);
        response = course.registrations
        statusCode = 200
    } catch (err) {
        if (err instanceof errors.ValidationError || err instanceof mongoose.Error.ValidationError) {
            statusCode = 400
            response = {message: err.message}
        } else if(err instanceof errors.NotFoundError) {
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
    getAllCourses,
    getCourse,
    createCourse,
    getCoursePreregistrations,
    getCourseRegistrations,
})
