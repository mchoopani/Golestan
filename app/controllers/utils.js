const { default: mongoose } = require("mongoose");
const errors = require("../errors");

function getController(func) {
    return async (req, res) => {
        ((req.params.id != undefined)
            ?func(req.params.id, req.body)
            :(req.method=='POST'?func(req.body):func(req.query)))
        .then(
            data => res.status(data != null? 200 : 404).json(data != null?data:{})
        ).catch(
            e => {
                if (e instanceof mongoose.Error.ValidationError || e instanceof errors.ValidationError) {
                    return res.status(400).json({
                        message: e.message
                    })
                }
                console.log(`error ${e.name} occured with this message: ${e.message}`)
                return res.status(500).json({
                    message: "an internal error occured.",
                })
            }
        )
    }
}

function getOwnAccessController(func, resourceOwner) {
    return async (req, res) => {
        if (resourceOwner.modelName == req.user.role && req.params.id != req.user.id) {
            return res.status(403).send({
                message: "you can only access to your own resource."
            })
        }
        await getController(func)(req, res);
    }
}

module.exports = Object.freeze({
    getController,
    getOwnAccessController,
})