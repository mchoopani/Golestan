const login = require("../use-cases/users/index.js");
const students = require("../use-cases/students/index.js");
const express = require("express");

const router = express.Router();

// router.get('/login', login);
function getController(func) {
    return async (req, res) => {
        func(req.params.id, req.body).then(
            data => res.status(data != null? 200 : 404).send(data)
        ).catch(
            e => res.status(500).send(e.message)
        );
    }
}
router.get('/admin/student/:id', getController(students.getStudentByID));
router.put('/admin/student/:id', getController(students.updateStudent));
router.delete('/admin/student/:id', getController(students.deleteStudent));
router.get('/admin/student', getController(students.getAllStudents));
router.post('/admin/student', getController(students.createStudent));


module.exports = router