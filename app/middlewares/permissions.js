function getIsUserTypeMiddleWare(...usertypes) {
    return (req, res, next) => {
        for (const usertype of usertypes) {
            if (req.user.role === usertype.modelName) {
                return next();
            }
        }
        return res.status(403).json(
           {message: "you haven't permissions to access to this resource."}
        )
    };
}

module.exports = Object.freeze({
    getIsUserTypeMiddleWare
})