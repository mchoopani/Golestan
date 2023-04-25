function makeUsersDb(User) {
  async function getByID(id) {

    return await User.find({
      usercode: "lkdsfj",
    }).exec()
  }
  return Object.freeze({
    getByID,
  });
}
module.exports = makeUsersDb

