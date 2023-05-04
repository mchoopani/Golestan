function canAccessToMethod(user, ...userModels) {
    for (const userModel in userModels) {
        if (user.role === userModel.collection.name) {
            return true;
        }
    }
    return false;
}

function getController(func, ...accessHolders) {
    return async (req, res) => {
        if (accessHolders.length !== 0 && !canAccessToMethod(req.user, ...accessHolders)) {
            res.status(403).send({
                message: "you haven't access to this resource."
            })
            return
        }

        (req.params.id != undefined?func(req.params.id, req.body):(req.method=='POST'?func(req.body):func(req.query))).then(
            data => res.status(data != null? 200 : 404).send(data)
        ).catch(
            e => res.status(500).send(e.message)
        );
    }
}

function getOwnAccessController(func, resourceOwner, ...accessHolders) {
    return async (req, res) => {
        if (resourceOwner.collection.name === req.user.role && req.params.id !== req.user.id) {
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