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
                await registrationUseCase.acceptRegistration()
                break;
            case "reject":
                await registrationUseCase.rejectRegistration()
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

module.exports = Object.freeze({
    acceptOrDenyRegistration,
})