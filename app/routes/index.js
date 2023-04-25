// const login = require("../use-cases/users/index.js");
const users = require("../use-cases/users/index.js");
const couress = require("../use-cases/courses/index.js");
const express = require("express");

const router = express.Router();

// router.get('/login', login);
function getController(func) {
    return async (req, res) => {
        (req.params.id != undefined?func(req.params.id, req.body):func(req.body)).then(
            data => res.status(data != null? 200 : 404).send(data)
        ).catch(
            e => res.status(500).send(e.message)
        );
    }
}
router.get('/admin/student/:id', getController(users.studentsUseCase.getStudentByID));
router.put('/admin/student/:id', getController(users.studentsUseCase.updateStudent));
router.delete('/admin/student/:id', getController(users.studentsUseCase.deleteStudent));
router.get('/admin/student', getController(users.studentsUseCase.getAllStudents));
router.post('/admin/student', getController(users.studentsUseCase.createStudent));

router.get('/admin/professor/:id', getController(users.professorsUseCase.getProfessorByID));
router.put('/admin/professor/:id', getController(users.professorsUseCase.updateProfessor));
router.delete('/admin/professor/:id', getController(users.professorsUseCase.deleteProfessor));
router.get('/admin/professor', getController(users.professorsUseCase.getAllProfessors));
router.post('/admin/professor', getController(users.professorsUseCase.createProfessor));


router.get('/courses', getController(couress.coursesUseCase.getAllCourses));
router.get('/courses/:id', getController(couress.coursesUseCase.getCourseByID));
router.post('/courses', getController(couress.coursesUseCase.createCourse));
router.put('/courses/:id', getController(couress.coursesUseCase.updateCourse));
router.delete('/courses/:id', getController(couress.coursesUseCase.deleteCourse));


module.exports = router