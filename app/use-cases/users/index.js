usersDb = require ("../../data-access/index.js");
async function login(id) {
        user = usersDb.getByID(id).then(
        (data) => {
            console.log(data)
        }
    ).catch(
        (err) => {
            console.log(err)
        }
    )
}

module.exports = Object.freeze({
    login,
});