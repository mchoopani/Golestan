function makeUsersDb(User) {
  async function findByUsername(username) {

    return await User.findOne({
      usercode: username
    });
  }

  return Object.freeze({
    findByUsername,
  })
}
module.exports = makeUsersDb

