// const login = require("../use-cases/users/index.js");
const users = require("../use-cases/users/index.js");
const couress = require("../use-cases/courses/index.js");
const express = require("express");
const controllerUtils = require("../controllers/utils.js");
const usersModels = require("../models/users/index.js");

const router = express.Router();

router.get('/admin/student/:id', controllerUtils.getController(users.studentsUseCase.getStudentByID, usersModels.ITManger));
router.put('/admin/student/:id', controllerUtils.getController(users.studentsUseCase.updateStudent, usersModels.ITManger));
router.delete('/admin/student/:id', controllerUtils.getController(users.studentsUseCase.deleteStudent, usersModels.ITManger));
router.get('/admin/student', controllerUtils.getController(users.studentsUseCase.getAllStudents, usersModels.ITManger));
router.post('/admin/student', controllerUtils.getController(users.studentsUseCase.createStudent, usersModels.ITManger));

router.get('/admin/professor/:id', controllerUtils.getController(users.professorsUseCase.getProfessorByID, usersModels.ITManger));
router.put('/admin/professor/:id', controllerUtils.getController(users.professorsUseCase.updateProfessor, usersModels.ITManger));
router.delete('/admin/professor/:id', controllerUtils.getController(users.professorsUseCase.deleteProfessor, usersModels.ITManger));
router.get('/admin/professor', controllerUtils.getController(users.professorsUseCase.getAllProfessors, usersModels.ITManger));
router.post('/admin/professor', controllerUtils.getController(users.professorsUseCase.createProfessor, usersModels.ITManger));

router.get('/admin/manager/:id', controllerUtils.getController(users.managersUseCase.getManagerByID, usersModels.ITManger));
router.put('/admin/manager/:id', controllerUtils.getController(users.managersUseCase.updateManager, usersModels.ITManger));
router.delete('/admin/manager/:id', controllerUtils.getController(users.managersUseCase.deleteManager, usersModels.ITManger));
router.get('/admin/manager', controllerUtils.getController(users.managersUseCase.getAllManagers, usersModels.ITManger));
router.post('/admin/manager', controllerUtils.getController(users.managersUseCase.createManager, usersModels.ITManger));

router.get('/courses', controllerUtils.getController(couress.coursesUseCase.getAllCourses, usersModels.Manager, usersModels.Student));
router.get('/courses/:id', controllerUtils.getController(couress.coursesUseCase.getCourseByID, usersModels.Manager, usersModels.Student));
router.post('/courses', controllerUtils.getController(couress.coursesUseCase.createCourse, usersModels.Manager));
router.put('/courses/:id', controllerUtils.getController(couress.coursesUseCase.updateCourse, usersModels.Manager));
router.delete('/courses/:id', controllerUtils.getController(couress.coursesUseCase.deleteCourse, usersModels.Manager));

router.get('/student', controllerUtils.getController(users.studentsUseCase.getAllStudents, usersModels.Manager));
router.get('/student/:id', controllerUtils.getController(users.studentsUseCase.getStudentByID, usersModels.Manager, usersModels.Student));
router.get('/professor', controllerUtils.getController(users.professorsUseCase.getAllProfessors, usersModels.Manager));
router.get('/professor/:id', controllerUtils.getController(users.professorsUseCase.getProfessorByID, usersModels.Manager));

router.put('/student/:id', controllerUtils.getOwnAccessController(users.studentsUseCase.updateStudent, usersModels.Manager, usersModels.Student, usersModels.Student));
router.put('/professor/:id', controllerUtils.getOwnAccessController(users.professorsUseCase.updateProfessor, usersModels.Professor, usersModels.Professor));

module.exports = router