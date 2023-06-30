const jwt = require("jsonwebtoken");
const accessDb = require("../data-access");
const express = require("express");

const login = () => {

    const router = express.Router();

    const login = async (req, res) => {
        username = req.body.username
        password = req.body.password

        const user = await accessDb.usersDb.findByUsername(username);
        if (user && user.password === password) {
            const token = jwt.sign({
                id: user._id,
                username: user.username,
                role: user.__t,
                college: user.college,
            }, process.env.AUTH_SALT, {expiresIn: `${process.env.AUTH_PASSWORD_EXPIRATION_HOURS || 1}h`});
            return res.json({token:token, username: user.username, role: user.__t})
        }
        return res.status(401).json({message: "username or password is wrong."})
    }

    const whoami = async (req, res) => {
        try {
            const user = jwt.verify(token, process.env.AUTH_SALT);
            return res.status(200).json(user)
        } catch (err) {
            return res.status(401).json({message:"token is invalid."});
        }
    }
    
    router.post("/login", login);
    router.get("/whoami", whoami);

    return router;
};



const authMiddleware = (req, res, next) => {

    const token = req.headers["authorization"]

    if (!token) {
        return res.status(403).json({message:"token is required."});
    }

    try {
        req.user = jwt.verify(token, process.env.AUTH_SALT);
    } catch (err) {
        return res.status(401).json({message:"token is invalid."});
    }

    next();
}

module.exports = Object.freeze({
    authMiddleware,
    login,
});