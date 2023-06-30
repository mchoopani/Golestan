const registrationUseCase = require("../use-cases/registrations/registration.js");
const errors = require("../errors");
const mongoose = require("mongoose");

async function acceptOrDenyRegistration(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        let data = req.body
        if (data.action === undefined) {
            throw new errors.InvalidArgumentError("empty action")
        }
        switch (data.action) {
            case "accept":
                await registrationUseCase.acceptRegistration(req.params.id)
                break;
            case "reject":
                await registrationUseCase.rejectRegistration(req.params.id)
                break;
            default:
                throw new errors.InvalidArgumentError("invalid action")
        }
        statusCode = 200
        response = {message: `registration ${data.action}ed`}
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

async function preregister(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        await registrationUseCase.createPreregistration(req.params.id, req.user.id)
        statusCode = 201
        response = {message: `preregistration created`}
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

async function cancelPreregister(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        await registrationUseCase.cancelPreregistration(req.params.id, req.user.id, req.user.username)
        statusCode = 200
        response = {message: `preregistration deleted`}
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

async function getPreregisteredCoursesOfTerm(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        let preregs = await registrationUseCase.getPreregisteredCoursesOfTerm(req.user.id, req.params.id)
        if (req.query.registered) {
            preregs = preregs.filter(prereg=>prereg.registered_before)
        }
        statusCode = 200
        response = {output: preregs || []}
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

async function register(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        await registrationUseCase.createRegistration(req.params.id, req.user.id)
        statusCode = 201
        response = {message: `registration created`}
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

async function cancelRegister(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        await registrationUseCase.cancelRegistration(req.params.id, req.user.id)
        statusCode = 200
        response = {message: `registration deleted`}
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

async function getRegisteredCoursesOfTerm(req, res) {
    let statusCode = undefined
    let response = {}
    try {
        let courses = []
        switch (req.user.role) {
            case "student":
                courses = await registrationUseCase.getRegisteredCoursesOfTerm(req.user.id, req.params.id)
                if (req.query.registered) {
                    courses = courses.filter(prereg=>prereg.registered_before)
                }
                break;
            case "professor":
                courses = await registrationUseCase.getAllRegisteredCourses(req.params.id)
        }
        statusCode = 200
        response = {output: courses || []}
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
    acceptOrDenyRegistration,
    preregister,
    cancelPreregister,
    getPreregisteredCoursesOfTerm,
    register,
    cancelRegister,
    getRegisteredCoursesOfTerm,
})