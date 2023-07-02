function getUseCase(dbAccessor) {
    async function getAll() {
        return await dbAccessor.findAll();
    }

    async function update(id, data) {
        return await dbAccessor.updateByID(id, data);
    }

    async function delete_(id) {
        return await dbAccessor.deleteByID(id);
    }

    async function getById(id) {
        return await dbAccessor.findByID(id);
    }

    return  Object.freeze({
        getAll,
        update,
        delete_,
        getById,
    });
}

module.exports = getUseCase
