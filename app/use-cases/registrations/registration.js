const accessDb = require("../../data-access");
const errors = require("../../errors");

async function acceptRegistration(id) {
    const reg = await accessDb.registrationDb.updateByID(id, {status: "accept"})
    if (reg == null) {
        throw new errors.NotFoundError("registration not found")
    }
    return reg
}

async function rejectRegistration(id) {
    const reg = await accessDb.registrationDb.updateByID(id, {status: "reject"})
    if (reg == null) {
        throw new errors.NotFoundError("registration not found")
    }
    return reg
}

module.exports = Object.freeze({
    acceptRegistration,
    rejectRegistration,
})
