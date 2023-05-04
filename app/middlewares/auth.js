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
                username: user.username,
                role: user.__t,
            }, "this is salt", {expiresIn: "1h"});
            return res.send({token:token})
        }
        return res.status(400).send({message: "username or password is wrong."})
    }
    
    router.post("/login", login);

    return router;
};



const authMiddleware = (req, res, next) => {

    const token = req.headers["authorization"]

    if (!token) {
        return res.status(403).send("token is required.");
    }

    try {
        const decodedUserDictinoary = jwt.verify(token, "this is salt");
        req.user = decodedUserDictinoary;
    } catch (err) {
        return res.status(401).send("token is invalid.");
    }

    next();
}

function isStudentMiddleware (req, res, next) {
    if (req.user.userType == "student") {
        return next();
    }
    res.status(403).json({
        message: "permission denied"
    })
}


module.exports = Object.freeze({
    authMiddleware,
    login,
});