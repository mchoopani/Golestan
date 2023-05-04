function canAccessToMethod(user, ...userModels) {
    for (const userModel of userModels) {
        if (user.role === userModel.modelName) {
            return true;
        }
    }
    return false;
}

function getController(func) {
    return async (req, res) => {
        (req.params.id != undefined?func(req.params.id, req.body):(req.method=='POST'?func(req.body):func(req.query))).then(
            data => res.status(data != null? 200 : 404).send(data)
        ).catch(
            e => res.status(500).send(e.message)
        );
    }
}

function getOwnAccessController(func, resourceOwner) {
    return async (req, res) => {
        if (resourceOwner.collection.collectionName === req.user.role && req.params.id !== req.user.id) {
            res.status(403).send({
                message: "you can only access to your own resource."
            })
        }
        await getController(func, ...accessHolders)();
    }
}

module.exports = Object.freeze({
    getController,
    getOwnAccessController,
})