const accessDb = require("../../data-access");
const errors = require("../../errors/index.js");

async function createManager(data) {
    const user = await accessDb.usersDb.findByUsername(data.usercode);
    if (user != null) {
        throw new errors.ValidationError("usercode is duplicated.")
    }
    return await accessDb.managersDb.create(data);
}

async function getAllManagers() {
    return await accessDb.managersDb.findAll();
}

async function updateManager(id, data) {
    return await accessDb.managersDb.updateByID(id, data);
}

async function deleteManager(id) {
    return await accessDb.managersDb.deleteByID(id);
}

async function getManagerByID(id) { 
    return await accessDb.managersDb.findByID(id);
}

module.exports = Object.freeze({
    createManager,
    getAllManagers,
    updateManager,
    deleteManager,
    getManagerByID,
});